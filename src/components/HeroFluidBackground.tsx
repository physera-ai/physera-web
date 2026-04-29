"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import {
  texture,
  Fn,
  uv,
  mul,
  min,
  add,
  sub,
  vec2,
  vec3,
  float,
  clamp,
  sin,
  cos,
  mix,
  dot,
  fract,
  floor,
  mx_noise_float,
  uniform,
} from "three/tsl";

export function HeroFluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let reqId: number;
    let isDisposed = false;

    // 1. Init WebGPU Renderer
    const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 2. Mouse Trail Canvas
    const mouseCanvas = document.createElement("canvas");
    mouseCanvas.width = window.innerWidth;
    mouseCanvas.height = window.innerHeight;
    const ctx = mouseCanvas.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, mouseCanvas.width, mouseCanvas.height);
    const trailTexture = new THREE.CanvasTexture(mouseCanvas);
    trailTexture.minFilter = THREE.LinearFilter;
    trailTexture.magFilter = THREE.LinearFilter;
    trailTexture.generateMipmaps = false;

    // Original Mouse Tracking state
    let currentX: number | null = null;
    let currentY: number | null = null;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let opacity = 0;
    const lerpSpeed = 0.075;
    const fadeInSpeed = 0.1;
    const fadeOutSpeed = 0.1;
    const moveThreshold = 0.5;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    
    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    window.addEventListener("pointermove", onPointerMove);

    // 3. Fluid Ping Pong RenderTargets
    const opts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let targetA = new THREE.RenderTarget(window.innerWidth, window.innerHeight, opts);
    let targetB = new THREE.RenderTarget(window.innerWidth, window.innerHeight, opts);

    const prevNode = texture(targetA.texture);
    const inputNode = texture(trailTexture);

    // 4. Fluid Shader (TSL) - Exact recreation from tutorial
    const blendDarken = Fn(([base, blend]: [any, any]) => min(blend, base));

    const rand = Fn(([n]: [any]) => {
      const dp = dot(n, vec2(12.9898, 4.1414));
      return fract(mul(sin(dp), 43758.5453));
    });

    const customNoise = Fn(([p]: [any]) => {
      const ip = floor(p);
      const u = fract(p);
      const uu = mul(mul(u, u), sub(float(3.0), mul(u, 2.0)));

      const res = mix(
        mix(rand(ip), rand(add(ip, vec2(1.0, 0.0))), uu.x),
        mix(rand(add(ip, vec2(0.0, 1.0))), rand(add(ip, vec2(1.0, 1.0))), uu.x),
        uu.y,
      );
      return mul(res, res);
    });

    const fbm = Fn(([x, numOctaves]: [any, any]) => {
      const v = float(0.0).toVar();
      const a = float(0.5).toVar();
      const shift = vec2(100);
      const angle = float(0.5);
      const c = cos(angle);
      const s = sin(angle);
      const xx = vec2(x).toVar();

      // 4 octaves
      v.assign(add(v, mul(a, customNoise(xx))));
      xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
      a.assign(mul(a, 0.5));

      v.assign(add(v, mul(a, customNoise(xx))));
      xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
      a.assign(mul(a, 0.5));

      v.assign(add(v, mul(a, customNoise(xx))));
      xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
      a.assign(mul(a, 0.5));

      v.assign(add(v, mul(a, customNoise(xx))));

      return v;
    });

    const createFluidShader = () => {
      const aspect = window.innerHeight / window.innerWidth;
      const aspectVec =
        window.innerWidth < window.innerHeight
          ? vec2(1.0, 1.0 / aspect)
          : vec2(aspect, 1.0);

      return Fn(() => {
        const uvCoord = uv();
        const disp = mul(mul(fbm(mul(uvCoord, 20.0), float(4)), aspectVec), 0.01);

        const texel = prevNode.sample(uvCoord);
        const texel2 = prevNode.sample(vec2(add(uvCoord.x, disp.x), uvCoord.y));
        const texel3 = prevNode.sample(vec2(sub(uvCoord.x, disp.x), uvCoord.y));
        const texel4 = prevNode.sample(vec2(uvCoord.x, add(uvCoord.y, disp.y)));
        const texel5 = prevNode.sample(vec2(uvCoord.x, sub(uvCoord.y, disp.y)));

        const floodcolor = texel.rgb.toVar();
        floodcolor.assign(blendDarken(floodcolor, texel2.rgb));
        floodcolor.assign(blendDarken(floodcolor, texel3.rgb));
        floodcolor.assign(blendDarken(floodcolor, texel4.rgb));
        floodcolor.assign(blendDarken(floodcolor, texel5.rgb));

        const flippedUV = vec2(uvCoord.x, sub(float(1.0), uvCoord.y));
        const input = inputNode.sample(flippedUV);
        const combined = blendDarken(floodcolor, input.rgb);

        return min(vec3(1.0), add(combined, vec3(0.015)));
      })();
    };

    const fboScene = new THREE.Scene();
    const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

    const fboMaterial = new THREE.MeshBasicNodeMaterial();
    fboMaterial.colorNode = createFluidShader();

    const geo = new THREE.PlaneGeometry(2, 2);
    const uvAttr = geo.attributes.uv;
    for (let i = 0; i < uvAttr.count; i++) {
      uvAttr.setY(i, 1.0 - uvAttr.getY(i));
    }
    const fboQuad = new THREE.Mesh(geo, fboMaterial);
    fboScene.add(fboQuad);

    // 5. Screen Pass (Compositing exactly as original PostProcessing)
    const screenScene = new THREE.Scene();
    const screenMaterial = new THREE.MeshBasicNodeMaterial();
    const maskNode = texture(targetA.texture);
    const timeNode = uniform(0.0);

    screenMaterial.colorNode = Fn(() => {
      const screenUV = uv();
      const fluidVal = maskNode.sample(screenUV).r;
      const fluidMask = sub(float(1.0), fluidVal);

      const solidColor = vec3(0.5, 0.5, 0.5); // White background
      const wireColor = vec3(1.0, 1.0, 1.0); // Red fluid reveal

      // Scan lines on solid
      const scanRaw = sin(mul(screenUV.y, float(1250.0)));
      const scanDarken = clamp(scanRaw, -1.0, 0.0).mul(-0.15);
      const scanLines = sub(float(1.0), scanDarken);
      const solidWithScanLines = solidColor.mul(scanLines);

      // Fluid mask composites solid ↔ wire
      const blended = mix(
        solidWithScanLines,
        wireColor,
        fluidMask
      );

      // Film grain
      const noiseNode = mx_noise_float(
        vec3(screenUV.mul(2000.0), timeNode.mul(20.0))
      ).mul(0.015);

      const withEffects = blended.sub(noiseNode);

      // Slight desaturation
      const luminance = dot(withEffects, vec3(0.299, 0.587, 0.114));
      const desaturated = mix(
        vec3(luminance, luminance, luminance),
        withEffects,
        float(0.985)
      );

      // Low contrast (lifting shadows slightly with blueish tint from original)
      const lowContrast = mix(vec3(0.0, 0.0, 0.2), desaturated, float(0.9));

      return lowContrast;
    })();

    const screenQuad = new THREE.Mesh(geo, screenMaterial);
    screenScene.add(screenQuad);

    // 6. Animation Loop
    const initRenderer = async () => {
      try {
        await renderer.init();
      } catch (err) {
        console.error("WebGPU init failed", err);
        return;
      }
      
      const animate = () => {
        if (isDisposed) return;
        reqId = requestAnimationFrame(animate);

        // Original MouseTrail update logic
        const targetX = pointerX;
        const targetY = pointerY;

        if (currentX === null || currentY === null) {
          currentX = targetX;
          currentY = targetY;
          lastX = targetX;
          lastY = targetY;
        } else {
          currentX += (targetX - currentX) * lerpSpeed;
          currentY += (targetY - currentY) * lerpSpeed;

          const dx = currentX - lastX!;
          const dy = currentY - lastY!;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > moveThreshold) {
            opacity = Math.min(1, opacity + fadeInSpeed);
          } else {
            opacity = Math.max(0, opacity - fadeOutSpeed);
          }

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, mouseCanvas.width, mouseCanvas.height);

          if (opacity > 0.01) {
            ctx.beginPath();
            ctx.moveTo(lastX!, lastY!);
            ctx.lineTo(currentX, currentY);
            ctx.lineCap = "round";
            ctx.lineWidth = Math.max(mouseCanvas.width * 0.2, 100);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.stroke();
          }

          lastX = currentX;
          lastY = currentY;
          trailTexture.needsUpdate = true;
        }

        // Update Fluid FBO
        prevNode.value = targetA.texture;
        renderer.setRenderTarget(targetB);
        renderer.render(fboScene, fboCamera);
        renderer.setRenderTarget(null);

        // Update mask for screen
        maskNode.value = targetB.texture;
        timeNode.value = performance.now() * 0.001;

        // Render to screen
        renderer.render(screenScene, fboCamera);

        // Swap FBOs
        const temp = targetA;
        targetA = targetB;
        targetB = temp;
      };

      animate();
    };

    initRenderer();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      mouseCanvas.width = window.innerWidth;
      mouseCanvas.height = window.innerHeight;
      targetA.setSize(window.innerWidth, window.innerHeight);
      targetB.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(reqId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      targetA.dispose();
      targetB.dispose();
      trailTexture.dispose();
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ touchAction: "none" }}
    />
  );
}
