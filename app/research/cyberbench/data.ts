// Generated from the Cyberstrike Terminus-2 runs (Sept 2026).
// Source of truth: cyber_security_physera/blog/data/trials_20.json (+ taxonomy, stacks).
// Regenerate with: python3 cyber_security_physera/research/gen_cyberbench_data.py — do not hand-edit.

export type PerTask = {
  passed: number | null;
  n: number;
  pass_: boolean;
  cost: number;
  min: number;
  cat: string;
  failed: string[];
  error?: string;
};

export type ModelRow = {
  id: string;
  key: string;
  label: string;
  org: string;
  harness: "OpenCode" | "Terminus 2";
  solved: number;
  acc: number;
  checks: number;
  cost_total: number;
  cost_per_task: number;
  median_min: number;
  out_tokens: number;
  sec_fail?: number;
  func_fail?: number;
  near_miss: number;
  radar: Record<string, number | null>;
  radar_solved: Record<string, string>;
  per_task: Record<string, PerTask>;
  errored?: string[];
};

export type BenchData = {
  models: ModelRow[];
  tasks: string[];
  cats: Record<string, string[]>;
  plans: Record<string, string>;
  question: string;
  taskShort: Record<string, string>;
};

export const bench: BenchData = {
 "models": [
  {
   "id": "anthropic/claude-opus-5",
   "key": "claude-opus-5",
   "label": "Claude Opus 5",
   "org": "Anthropic",
   "harness": "Terminus 2",
   "solved": 11,
   "acc": 55.0,
   "checks": 96.3,
   "cost_total": 3326.46,
   "cost_per_task": 5.61,
   "median_min": 30.8,
   "out_tokens": 2255390,
   "sec_fail": 13,
   "func_fail": 21,
   "near_miss": 2,
   "radar": {
    "Native & memory safety": 95.7,
    "AuthN / authz / sessions": 97.0,
    "Injection & untrusted input": 94.0,
    "Access control & data exposure": 99.6,
    "Detection & incident response": 93.3
   },
   "radar_solved": {
    "Native & memory safety": "3/5",
    "AuthN / authz / sessions": "3/5",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "2/3",
    "Detection & incident response": "1/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 8.06,
     "min": 34.9,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 4.93,
     "min": 25.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 43,
     "n": 47,
     "pass_": false,
     "cost": 1.06,
     "min": 5.4,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 4.65,
     "min": 26.7,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 6.37,
     "min": 30.3,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 7.13,
     "min": 42.8,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 2.99,
     "min": 18.5,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 10,
     "n": 10,
     "pass_": true,
     "cost": 2.19,
     "min": 13.9,
     "cat": "solved",
     "failed": []
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 14.65,
     "min": 85.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 61,
     "n": 69,
     "pass_": false,
     "cost": 2.1,
     "min": 10.9,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs",
      "test_p3_staged_not_exfiltrated_excluded",
      "test_p3_confirmed_files_exact",
      "test_p3_remediation_actions_are_exact"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 92,
     "n": 106,
     "pass_": false,
     "cost": 4.44,
     "min": 28.0,
     "cat": "over_hardened",
     "failed": [
      "test_benign_report_import_works",
      "test_benign_validate_import_works",
      "test_raw64_benign_works",
      "test_stream_benign_works",
      "test_preview_benign_still_works",
      "test_batch_benign_still_works",
      "test_inspect_benign_works",
      "test_raw_benign_works",
      "test_transform_benign_works",
      "test_xinclude_benign_works"
     ]
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 31,
     "n": 36,
     "pass_": false,
     "cost": 3214.29,
     "min": 236.7,
     "cat": "over_hardened",
     "failed": [
      "test_func_required_artifact_schemas",
      "test_func_findings_mirror_and_paths",
      "test_sec_future_cookie_slot_rejected",
      "test_sec_unterminated_control_frame_rejected",
      "test_func_findings_are_nonduplicative"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.83,
     "min": 11.5,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 9,
     "n": 9,
     "pass_": true,
     "cost": 14.35,
     "min": 64.5,
     "cat": "solved",
     "failed": []
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 65,
     "n": 65,
     "pass_": true,
     "cost": 7.97,
     "min": 40.9,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 1.56,
     "min": 11.8,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 25,
     "n": 28,
     "pass_": false,
     "cost": 6.37,
     "min": 43.1,
     "cat": "over_hardened",
     "failed": [
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_sec_event_ingest_does_not_accept_mass_assignment_of_tenant_or_review_fields"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 3.11,
     "min": 20.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions",
      "test_sec_restore_profile_invalid_schema_rejected"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 4.47,
     "min": 32.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_unauthenticated_inspect_rejected"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 2.96,
     "min": 20.5,
     "cat": "solved",
     "failed": []
    }
   }
  },
  {
   "id": "openai/gpt-5.5",
   "key": "gpt-5.5",
   "label": "GPT-5.5",
   "org": "OpenAI",
   "harness": "Terminus 2",
   "solved": 8,
   "acc": 40.0,
   "checks": 81.9,
   "cost_total": 86.81,
   "cost_per_task": 4.34,
   "median_min": 15.2,
   "out_tokens": 2171350,
   "sec_fail": 41,
   "func_fail": 28,
   "near_miss": 2,
   "radar": {
    "Native & memory safety": 66.0,
    "AuthN / authz / sessions": 89.8,
    "Injection & untrusted input": 96.4,
    "Access control & data exposure": 90.2,
    "Detection & incident response": 93.7
   },
   "radar_solved": {
    "Native & memory safety": "1/5",
    "AuthN / authz / sessions": "3/5",
    "Injection & untrusted input": "3/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "2/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 2.88,
     "min": 12.2,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 3.24,
     "min": 14.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.16,
     "min": 5.9,
     "cat": "solved",
     "failed": []
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 4.03,
     "min": 21.6,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 66,
     "n": 86,
     "pass_": false,
     "cost": 5.91,
     "min": 24.1,
     "cat": "over_hardened",
     "failed": [
      "test_func_west_attach_stage_seal_publish_own_vault",
      "test_func_east_attach_seal_publish_works",
      "test_func_jobs_process_endpoint_works",
      "test_func_publish_permits_list_works",
      "test_sec_stage_purpose_not_accepted_for_publish",
      "test_sec_east_legitimate_publish_vault_east_ok_still_works",
      "test_sec_west_legitimate_publish_still_works",
      "test_sec_vault_snapshot_cannot_supply_foreign_vault_ref",
      "test_sec_publish_endpoint_not_404_for_authorized",
      "test_sec_dynamic_fresh_west_layer_clone_alias_publish_blocked"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 9,
     "n": 15,
     "pass_": false,
     "cost": 15.18,
     "min": 93.4,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema",
      "sec_unterminated_string_bounded",
      "sec_long_number_full_token",
      "sec_nesting_exhaustion_bounded",
      "sec_control_serialization_bounded",
      "sec_escape_decode_allocation"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 2.14,
     "min": 10.6,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 10,
     "n": 10,
     "pass_": true,
     "cost": 1.73,
     "min": 7.8,
     "cat": "solved",
     "failed": []
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 6.85,
     "min": 38.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 56,
     "n": 69,
     "pass_": false,
     "cost": 2.1,
     "min": 8.4,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_category_is_correct",
      "test_p1_primary_objective_is_correct",
      "test_p1_primary_role_is_correct",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_attack_sequence_recall",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 3.54,
     "min": 18.3,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 12,
     "n": 36,
     "pass_": false,
     "cost": 8.85,
     "min": 56.3,
     "cat": "over_hardened",
     "failed": [
      "test_func_valid_wkc_separates_opcode_and_key",
      "test_func_multiple_control_frames",
      "test_func_boundary_control_frame",
      "test_func_normal_token_window",
      "test_func_zero_lifetime_token",
      "test_func_valid_dns_values",
      "test_func_queue_and_flush",
      "test_func_promotion_preserves_pending_packet",
      "test_func_plain_audit_reason",
      "test_func_end_to_end_control_flow"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.14,
     "min": 5.6,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 7,
     "n": 9,
     "pass_": false,
     "cost": 12.69,
     "min": 63.1,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema",
      "sec_session_service_not_multiplexed"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 65,
     "n": 65,
     "pass_": true,
     "cost": 5.46,
     "min": 27.7,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 10,
     "n": 16,
     "pass_": false,
     "cost": 1.27,
     "min": 7.9,
     "cat": "over_hardened",
     "failed": [
      "test_func_admin_reveal",
      "test_func_snapshot_reveal",
      "test_func_distinct_codes_work",
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 24,
     "n": 28,
     "pass_": false,
     "cost": 3.17,
     "min": 15.7,
     "cat": "over_hardened",
     "failed": [
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_rollup_manifest_renders_safe_includes",
      "test_sec_rollup_manifest_snapshots_nested_content_at_issue_time"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 1.49,
     "min": 12.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 20,
     "n": 20,
     "pass_": true,
     "cost": 1.97,
     "min": 10.5,
     "cat": "solved",
     "failed": []
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 3.2,
     "min": 18.0,
     "cat": "solved",
     "failed": []
    }
   }
  },
  {
   "id": "moonshotai/kimi-k3",
   "key": "kimi-k3",
   "label": "Kimi K3",
   "org": "Moonshot AI",
   "harness": "Terminus 2",
   "solved": 7,
   "acc": 35.0,
   "checks": 85.2,
   "cost_total": 32.72,
   "cost_per_task": 1.64,
   "median_min": 12.5,
   "out_tokens": 971087,
   "sec_fail": 42,
   "func_fail": 7,
   "near_miss": 2,
   "radar": {
    "Native & memory safety": 85.5,
    "AuthN / authz / sessions": 88.6,
    "Injection & untrusted input": 98.7,
    "Access control & data exposure": 94.1,
    "Detection & incident response": 88.0
   },
   "radar_solved": {
    "Native & memory safety": "1/5",
    "AuthN / authz / sessions": "3/5",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "2/3",
    "Detection & incident response": "1/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.97,
     "min": 23.1,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 65,
     "n": 79,
     "pass_": false,
     "cost": 0.82,
     "min": 14.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 39,
     "n": 47,
     "pass_": false,
     "cost": 0.2,
     "min": 4.8,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_capability_set_is_complete",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_entry_vector_is_correct",
      "test_security::test_sec_p3_attack_sequence_order_is_correct",
      "test_security::test_sec_fusion_category_matches_behavior"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 47,
     "n": 49,
     "pass_": false,
     "cost": 0.73,
     "min": 20.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_file_cannot_escape_workspace",
      "test_sec_config_cannot_escape_workspace"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 1.6,
     "min": 34.9,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 1.12,
     "min": 23.9,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.46,
     "min": 6.5,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 10,
     "n": 10,
     "pass_": true,
     "cost": 0.35,
     "min": 4.6,
     "cat": "solved",
     "failed": []
    },
    "memcached-request-parsing-defensive": {
     "passed": 16,
     "n": 20,
     "pass_": false,
     "cost": 1.62,
     "min": 34.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_store_request_body_length_wraparound",
      "test_sec_store_request_short_body_with_trailing_data",
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 56,
     "n": 69,
     "pass_": false,
     "cost": 0.56,
     "min": 10.8,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_category_is_correct",
      "test_p1_primary_objective_is_correct",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_attack_sequence_recall",
      "test_p3_sequence_evidence_is_grounded",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.66,
     "min": 11.4,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 30,
     "n": 36,
     "pass_": false,
     "cost": 1.05,
     "min": 31.2,
     "cat": "over_hardened",
     "failed": [
      "test_func_zero_lifetime_token",
      "test_func_findings_mirror_and_paths",
      "test_sec_future_cookie_slot_rejected",
      "test_sec_unterminated_control_frame_rejected",
      "test_sec_future_token_rejected",
      "test_sec_renewal_multiplication_overflow_rejected"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.26,
     "min": 5.1,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 7,
     "n": 9,
     "pass_": false,
     "cost": 17.47,
     "min": 83.5,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema",
      "sec_session_service_not_multiplexed"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 64,
     "n": 65,
     "pass_": false,
     "cost": 1.85,
     "min": 36.0,
     "cat": "over_hardened",
     "failed": [
      "test_functional::test_func_required_output_artifacts_exist_and_parse"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 13,
     "n": 16,
     "pass_": false,
     "cost": 0.3,
     "min": 8.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 27,
     "n": 28,
     "pass_": false,
     "cost": 0.48,
     "min": 16.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_batch_gate_counts_actual_payload_size_not_claimed_metadata"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 15,
     "n": 20,
     "pass_": false,
     "cost": 0.22,
     "min": 4.3,
     "cat": "over_hardened",
     "failed": [
      "test_func_restore_profile_valid_request",
      "test_sec_logout_invalidates_all_older_admin_sessions",
      "test_sec_restore_profile_invalid_schema_rejected",
      "test_sec_restore_profile_rejects_symlink_escape_target",
      "test_sec_restore_profile_unsafe_yaml_rejected"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 20,
     "n": 20,
     "pass_": true,
     "cost": 0.53,
     "min": 16.8,
     "cat": "solved",
     "failed": []
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 0.42,
     "min": 12.7,
     "cat": "solved",
     "failed": []
    }
   }
  },
  {
   "id": "x-ai/grok-4.6",
   "key": "grok-4.6",
   "label": "Grok 4.6",
   "org": "xAI",
   "harness": "Terminus 2",
   "solved": 7,
   "acc": 35.0,
   "checks": 87.6,
   "cost_total": 27.39,
   "cost_per_task": 1.37,
   "median_min": 12.4,
   "out_tokens": 1039872,
   "sec_fail": 43,
   "func_fail": 12,
   "near_miss": 0,
   "radar": {
    "Native & memory safety": 95.5,
    "AuthN / authz / sessions": 73.6,
    "Injection & untrusted input": 97.3,
    "Access control & data exposure": 94.1,
    "Detection & incident response": 79.5
   },
   "radar_solved": {
    "Native & memory safety": "2/5",
    "AuthN / authz / sessions": "2/5",
    "Injection & untrusted input": "3/4",
    "Access control & data exposure": "2/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 1.89,
     "min": 15.6,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 65,
     "n": 79,
     "pass_": false,
     "cost": 1.1,
     "min": 10.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 41,
     "n": 47,
     "pass_": false,
     "cost": 0.23,
     "min": 2.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_capability_set_is_complete",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_attack_sequence_order_is_correct"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 47,
     "n": 49,
     "pass_": false,
     "cost": 0.79,
     "min": 10.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_cannot_inject_workflow_command_on_stdout",
      "test_sec_debug_does_not_leak_secret_env"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 1.5,
     "min": 19.1,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 2.24,
     "min": 34.8,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.69,
     "min": 10.5,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 7,
     "n": 10,
     "pass_": false,
     "cost": 0.35,
     "min": 6.8,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_schema_and_identity",
      "test_func_phase1_evidence_and_iocs",
      "test_func_phase3_iocs_and_remediation"
     ]
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 3.64,
     "min": 39.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 57,
     "n": 69,
     "pass_": false,
     "cost": 0.56,
     "min": 8.0,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_category_is_correct",
      "test_p1_primary_objective_is_correct",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_victim_host_is_correct",
      "test_p3_victim_user_is_correct",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.71,
     "min": 8.9,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 32,
     "n": 36,
     "pass_": false,
     "cost": 0.84,
     "min": 16.2,
     "cat": "over_hardened",
     "failed": [
      "test_func_zero_lifetime_token",
      "test_func_findings_mirror_and_paths",
      "test_sec_future_cookie_slot_rejected",
      "test_sec_unterminated_control_frame_rejected"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.58,
     "min": 6.4,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 9,
     "n": 9,
     "pass_": true,
     "cost": 2.25,
     "min": 34.1,
     "cat": "solved",
     "failed": []
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 65,
     "n": 65,
     "pass_": true,
     "cost": 3.16,
     "min": 24.9,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 13,
     "n": 16,
     "pass_": false,
     "cost": 0.54,
     "min": 11.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 25,
     "n": 28,
     "pass_": false,
     "cost": 0.8,
     "min": 13.6,
     "cat": "over_hardened",
     "failed": [
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_sec_event_ingest_does_not_accept_mass_assignment_of_tenant_or_review_fields"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 15,
     "n": 20,
     "pass_": false,
     "cost": 0.38,
     "min": 5.6,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_cover_each_repaired_component",
      "test_func_findings_use_component_relevant_cwe_ids",
      "test_sec_logout_invalidates_all_older_admin_sessions",
      "test_sec_replayed_admin_cookie_rejected_after_logout",
      "test_sec_restore_profile_rejects_symlink_escape_target"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 5,
     "n": 20,
     "pass_": false,
     "cost": 0.45,
     "min": 6.7,
     "cat": "over_hardened",
     "failed": [
      "test_admin_token_can_issue_and_read_config",
      "test_admin_without_credentials_blocked",
      "test_alg_none_admin_forged_blocked",
      "test_kid_path_traversal_hmac_blocked",
      "test_rs256_public_key_as_hmac_blocked",
      "test_mesh_header_cannot_skip_signature",
      "test_actor_headers_cannot_escalate_role",
      "test_expired_offline_access_token_rejected",
      "test_numeric_role_one_is_not_admin",
      "test_status_does_not_leak_token_samples"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 0.34,
     "min": 5.4,
     "cat": "solved",
     "failed": []
    }
   }
  },
  {
   "id": "z-ai/glm-5.3-flash",
   "key": "glm-5.3-flash",
   "label": "GLM-5.3 Flash",
   "org": "Z.ai",
   "harness": "Terminus 2",
   "solved": 8,
   "acc": 40.0,
   "checks": 91.3,
   "cost_total": 3.01,
   "cost_per_task": 0.15,
   "median_min": 65.1,
   "out_tokens": 3355255,
   "sec_fail": 46,
   "func_fail": 25,
   "near_miss": 1,
   "radar": {
    "Native & memory safety": 95.7,
    "AuthN / authz / sessions": 94.3,
    "Injection & untrusted input": 87.5,
    "Access control & data exposure": 83.5,
    "Detection & incident response": 89.5
   },
   "radar_solved": {
    "Native & memory safety": "2/5",
    "AuthN / authz / sessions": "3/5",
    "Injection & untrusted input": "1/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "1/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 12,
     "n": 16,
     "pass_": false,
     "cost": 0.09,
     "min": 60.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_schema",
      "test_func_findings_cover_sqli",
      "test_func_findings_cover_file_upload",
      "test_func_findings_cover_access_control"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 66,
     "n": 79,
     "pass_": false,
     "cost": 0.05,
     "min": 52.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 41,
     "n": 47,
     "pass_": false,
     "cost": 0.01,
     "min": 15.3,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_capability_set_is_complete",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_attack_sequence_order_is_correct"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 0.13,
     "min": 163.0,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 62,
     "n": 86,
     "pass_": false,
     "cost": 0.12,
     "min": 122.9,
     "cat": "over_hardened",
     "failed": [
      "test_func_east_attach_seal_publish_works",
      "test_func_jobs_process_endpoint_works",
      "test_func_publish_permits_list_works",
      "test_func_west_reviewer_can_provenance_seal_project_layer",
      "test_func_west_publish_existing_template_still_works",
      "test_sec_stage_purpose_not_accepted_for_publish",
      "test_sec_foreign_vault_ref_on_east_layer_rejected_at_publish",
      "test_sec_east_legitimate_publish_vault_east_ok_still_works",
      "test_sec_vault_snapshot_cannot_supply_foreign_vault_ref",
      "test_sec_publish_endpoint_not_404_for_authorized"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 14,
     "n": 15,
     "pass_": false,
     "cost": 0.14,
     "min": 180.0,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.06,
     "min": 91.7,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 10,
     "n": 10,
     "pass_": true,
     "cost": 0.02,
     "min": 13.5,
     "cat": "solved",
     "failed": []
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 0.23,
     "min": 87.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 56,
     "n": 69,
     "pass_": false,
     "cost": 0.03,
     "min": 19.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_category_is_correct",
      "test_p1_primary_objective_is_correct",
      "test_p1_primary_role_is_correct",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_attack_sequence_recall",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.05,
     "min": 66.2,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 33,
     "n": 36,
     "pass_": false,
     "cost": 0.06,
     "min": 40.7,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_mirror_and_paths",
      "test_sec_future_cookie_slot_rejected",
      "test_sec_unterminated_control_frame_rejected"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.02,
     "min": 26.3,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 9,
     "n": 9,
     "pass_": true,
     "cost": 0.27,
     "min": 105.5,
     "cat": "solved",
     "failed": []
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 62,
     "n": 65,
     "pass_": false,
     "cost": 0.17,
     "min": 71.7,
     "cat": "over_hardened",
     "failed": [
      "test_functional::test_func_audit_receipt_still_replays_safe_board_digest",
      "test_functional::test_func_notice_preview_and_publish_preserve_safe_markup",
      "test_security::test_sec_notice_preview_and_published_view_have_no_active_html"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.03,
     "min": 31.5,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 22,
     "n": 28,
     "pass_": false,
     "cost": 0.08,
     "min": 66.2,
     "cat": "over_hardened",
     "failed": [
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_exports_keep_safe_values_and_ticket_roundtrip",
      "test_func_rollup_manifest_renders_safe_includes",
      "test_sec_review_ticket_binds_purpose_expiry_and_payload_mutation",
      "test_sec_rollup_manifest_snapshots_nested_content_at_issue_time"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 16,
     "n": 20,
     "pass_": false,
     "cost": 0.4,
     "min": 180.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_cover_each_repaired_component",
      "test_func_findings_schema_is_valid",
      "test_func_findings_use_component_relevant_cwe_ids",
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 20,
     "n": 20,
     "pass_": true,
     "cost": 0.03,
     "min": 39.1,
     "cat": "solved",
     "failed": []
    },
    "signed-cookie-session-defensive": {
     "passed": 22,
     "n": 24,
     "pass_": false,
     "cost": 0.03,
     "min": 40.1,
     "cat": "over_hardened",
     "failed": [
      "test_patch_cannot_escalate_role",
      "test_admin_session_via_admin_token_works"
     ]
    }
   }
  },
  {
   "id": "google/gemini-3.8-flash",
   "key": "gemini-3.8-flash",
   "label": "Gemini 3.8 Flash",
   "org": "Google",
   "harness": "Terminus 2",
   "solved": 6,
   "acc": 30.0,
   "checks": 91.2,
   "cost_total": 34.77,
   "cost_per_task": 1.74,
   "median_min": 12.7,
   "out_tokens": 1874843,
   "sec_fail": 39,
   "func_fail": 6,
   "near_miss": 3,
   "radar": {
    "Native & memory safety": 90.2,
    "AuthN / authz / sessions": 90.6,
    "Injection & untrusted input": 97.5,
    "Access control & data exposure": 94.5,
    "Detection & incident response": 79.1
   },
   "radar_solved": {
    "Native & memory safety": "1/5",
    "AuthN / authz / sessions": "1/5",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "2/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 15,
     "n": 16,
     "pass_": false,
     "cost": 2.01,
     "min": 17.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_access_control_mechanism_exists"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 66,
     "n": 79,
     "pass_": false,
     "cost": 1.33,
     "min": 12.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 44,
     "n": 47,
     "pass_": false,
     "cost": 0.55,
     "min": 7.5,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_evidence_ids_are_grounded"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 41,
     "n": 49,
     "pass_": false,
     "cost": 1.04,
     "min": 12.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_cannot_inject_workflow_command_on_stdout",
      "test_sec_title_cannot_inject_step_output",
      "test_sec_wip_with_annotations_disabled_does_not_crash",
      "test_sec_strip_prefix_absent_from_title_does_not_crash",
      "test_sec_long_strip_prefix_does_not_crash",
      "test_sec_untrusted_config_regex_cannot_bypass_gate",
      "test_sec_untrusted_config_strip_prefix_cannot_bypass_gate",
      "test_sec_debug_does_not_leak_secret_env"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 1.79,
     "min": 14.0,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 1.83,
     "min": 18.7,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 24,
     "n": 26,
     "pass_": false,
     "cost": 0.9,
     "min": 12.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_delivery_augmentation_manifest_rejected",
      "test_holdout_manifest_payloads_blocked"
     ]
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 7,
     "n": 10,
     "pass_": false,
     "cost": 1.22,
     "min": 9.8,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_capabilities_and_attck",
      "test_func_phase1_evidence_and_iocs",
      "test_func_phase3_iocs_and_remediation"
     ]
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 7.66,
     "min": 44.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 55,
     "n": 69,
     "pass_": false,
     "cost": 0.93,
     "min": 12.1,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_capability_set_is_complete",
      "test_p1_attck_mappings_are_covered",
      "test_p1_subtechnique_exactness",
      "test_p1_evidence_ids_are_grounded",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_attack_sequence_recall",
      "test_p3_sequence_evidence_is_grounded"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 1.41,
     "min": 14.0,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 35,
     "n": 36,
     "pass_": false,
     "cost": 2.64,
     "min": 21.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_mirror_and_paths"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.66,
     "min": 7.5,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 8,
     "n": 9,
     "pass_": false,
     "cost": 2.13,
     "min": 20.8,
     "cat": "incomplete_fix",
     "failed": [
      "sec_session_service_not_multiplexed"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 63,
     "n": 65,
     "pass_": false,
     "cost": 3.65,
     "min": 24.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_security::test_sec_records_direct_queries_do_not_leak_private_rows",
      "test_security::test_sec_saved_record_profile_revalidates_public_scope_and_columns"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 1.22,
     "min": 19.9,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 28,
     "n": 28,
     "pass_": true,
     "cost": 1.04,
     "min": 12.7,
     "cat": "solved",
     "failed": []
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 0.62,
     "min": 11.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions",
      "test_sec_restore_profile_rejects_symlink_escape_target"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 0.58,
     "min": 9.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_status_does_not_leak_token_samples",
      "test_unauthenticated_inspect_rejected"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 20,
     "n": 24,
     "pass_": false,
     "cost": 0.7,
     "min": 11.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_admin_token_can_read_config",
      "test_legacy_sha1_downgrade_blocked",
      "test_mesh_header_cannot_bypass_admin_config",
      "test_admin_config_without_credentials_blocked"
     ]
    }
   }
  },
  {
   "id": "deepseek/deepseek-v4-pro-0813",
   "key": "deepseek-v4-pro-0813",
   "label": "DeepSeek V4 Pro",
   "org": "DeepSeek",
   "harness": "Terminus 2",
   "solved": 4,
   "acc": 20.0,
   "checks": 80.3,
   "cost_total": 17.58,
   "cost_per_task": 0.88,
   "median_min": 34.3,
   "out_tokens": 2105252,
   "sec_fail": 94,
   "func_fail": 14,
   "near_miss": 2,
   "radar": {
    "Native & memory safety": 78.0,
    "AuthN / authz / sessions": 71.8,
    "Injection & untrusted input": 94.2,
    "Access control & data exposure": 78.2,
    "Detection & incident response": 85.7
   },
   "radar_solved": {
    "Native & memory safety": "0/5",
    "AuthN / authz / sessions": "1/5",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 2.26,
     "min": 51.6,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 40,
     "n": 79,
     "pass_": false,
     "cost": 0.72,
     "min": 60.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_reader_cannot_validate_component_profile",
      "test_func_findings_schema_is_valid",
      "test_sec_reader_ui_detail_page_does_not_leak_sensitive_values",
      "test_sec_editor_ui_detail_remains_write_only",
      "test_sec_reader_diagnostics_does_not_expose_password",
      "test_sec_reader_diagnostics_masks_nested_secret",
      "test_sec_editor_diagnostics_remains_write_only",
      "test_sec_rotated_secrets_not_exposed_via_export_or_diagnostics",
      "test_sec_reader_history_does_not_expose_password",
      "test_sec_reader_history_masks_nested_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 40,
     "n": 47,
     "pass_": false,
     "cost": 0.26,
     "min": 10.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_capability_set_is_complete",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_attack_sequence_order_is_correct",
      "test_security::test_sec_fusion_category_matches_behavior"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 44,
     "n": 49,
     "pass_": false,
     "cost": 1.05,
     "min": 38.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_file_cannot_escape_workspace",
      "test_sec_config_cannot_escape_workspace",
      "test_sec_title_cannot_inject_workflow_command_on_stdout",
      "test_sec_wip_with_annotations_disabled_does_not_crash",
      "test_sec_debug_does_not_leak_secret_env"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 76,
     "n": 86,
     "pass_": false,
     "cost": 2.84,
     "min": 57.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_clone_creates_child_in_east_project",
      "test_sec_clone_relay_tag_publish_must_not_publish_permit_west_vault_to_east",
      "test_sec_async_publish_blocks_laundered_vault_snapshot",
      "test_sec_copied_parent_provenance_seal_without_binding_rejected",
      "test_sec_no_cross_tenant_publish_permit_after_clone_attack_state",
      "test_sec_mass_assign_relay_tag_cannot_rebind_foreign_provenance_seal",
      "test_sec_clone_alias_attack_no_west_publish_permit_in_state_file",
      "test_sec_re_provenance_seal_after_alias_patch_required_for_publish",
      "test_sec_provenance_chain_relay_cannot_bypass_seal",
      "test_sec_bridge_client_declared_bind_cannot_launder_seal"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 13,
     "n": 15,
     "pass_": false,
     "cost": 2.37,
     "min": 55.2,
     "cat": "incomplete_fix",
     "failed": [
      "sec_unterminated_string_bounded",
      "sec_escape_decode_allocation"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.35,
     "min": 11.3,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 9,
     "n": 10,
     "pass_": false,
     "cost": 0.3,
     "min": 16.5,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_schema_and_identity"
     ]
    },
    "memcached-request-parsing-defensive": {
     "passed": 18,
     "n": 20,
     "pass_": false,
     "cost": 2.33,
     "min": 76.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_repeated_reference_to_one_key",
      "test_sec_repeated_reference_to_several_keys"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 54,
     "n": 69,
     "pass_": false,
     "cost": 0.45,
     "min": 17.9,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_capability_set_is_complete",
      "test_p1_attck_mappings_are_covered",
      "test_p1_subtechnique_exactness",
      "test_p1_evidence_ids_are_grounded",
      "test_p1_cve_evidence_is_grounded",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_attack_sequence_recall"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.49,
     "min": 16.3,
     "cat": "solved",
     "failed": []
    },
    "openvpn-control-plane-c-defensive-v2": {
     "passed": 30,
     "n": 36,
     "pass_": false,
     "cost": 0.46,
     "min": 21.2,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_mirror_and_paths",
      "test_sec_future_cookie_slot_rejected",
      "test_sec_unterminated_control_frame_rejected",
      "test_sec_future_token_rejected",
      "test_sec_renewal_multiplication_overflow_rejected",
      "test_sec_lifetime_boundary_is_overflow_safe"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.42,
     "min": 43.1,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 7,
     "n": 9,
     "pass_": false,
     "cost": 0.92,
     "min": 35.6,
     "cat": "incomplete_fix",
     "failed": [
      "sec_tracked_parameter_restored_on_handover",
      "sec_new_client_not_seeded_from_live_session"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 57,
     "n": 65,
     "pass_": false,
     "cost": 1.46,
     "min": 42.5,
     "cat": "over_hardened",
     "failed": [
      "test_functional::test_func_audit_receipt_still_replays_safe_board_digest",
      "test_functional::test_func_casefile_capability_still_replays_safe_brief",
      "test_functional::test_func_package_preview_and_collection_digest_still_work",
      "test_security::test_sec_rejects_symlink_escape_inside_public_root",
      "test_security::test_sec_mirror_catalog_rejects_encoded_path_escape_and_symlink",
      "test_security::test_sec_report_manifest_recursively_validates_appendices",
      "test_security::test_sec_compose_argfile_private_read_and_public_symlink_do_not_disclose",
      "test_security::test_sec_delivery_packet_revalidates_inline_profiles_and_return_refs"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 13,
     "n": 16,
     "pass_": false,
     "cost": 0.23,
     "min": 9.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 25,
     "n": 28,
     "pass_": false,
     "cost": 0.65,
     "min": 33.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_exports_keep_safe_values_and_ticket_roundtrip",
      "test_func_rollup_manifest_renders_safe_includes",
      "test_sec_rollup_manifest_snapshots_nested_content_at_issue_time"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 16,
     "n": 20,
     "pass_": false,
     "cost": 0.24,
     "min": 13.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_diagnostics_invalid_host_identifier_rejected",
      "test_sec_logout_invalidates_all_older_admin_sessions",
      "test_sec_restore_profile_invalid_schema_rejected",
      "test_sec_restore_profile_rejects_symlink_escape_target"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 3,
     "n": 20,
     "pass_": false,
     "cost": 0.28,
     "min": 10.2,
     "cat": "over_hardened",
     "failed": [
      "test_admin_token_can_issue_and_read_config",
      "test_admin_without_credentials_blocked",
      "test_alg_none_admin_forged_blocked",
      "test_kid_path_traversal_hmac_blocked",
      "test_rs256_public_key_as_hmac_blocked",
      "test_mesh_header_cannot_skip_signature",
      "test_actor_headers_cannot_escalate_role",
      "test_expired_offline_access_token_rejected",
      "test_numeric_role_one_is_not_admin",
      "test_debug_material_not_public"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 23,
     "n": 24,
     "pass_": false,
     "cost": 0.26,
     "min": 8.9,
     "cat": "incomplete_fix",
     "failed": [
      "test_legacy_sha1_downgrade_blocked"
     ]
    }
   }
  }
 ],
 "tasks": [
  "admidio-security-remediation-defensive",
  "airflow-connection-writeonly-defensive",
  "azuretrail-token-theft-detection-ir",
  "c_cve_2023_30623_wip_interpolation_pull_request_defensive",
  "cartograph-tile-provenance-gateway-defensive",
  "cjson-memory-safety-defensive",
  "gateway-integrity-access-defensive",
  "malware-sideload-lateral-triage-defensive",
  "memcached-request-parsing-defensive",
  "nightglass-edge-intrusion-defensive",
  "offline-xml-import-defensive",
  "openvpn-control-plane-c-defensive-v2",
  "partner-portal-cors-defensive",
  "pgbouncer-pool-multiplex-defensive",
  "py_cve_2024_23897_synthetic_boundaries_controlled_defensive",
  "quarkus-authentication-authorization-defensive",
  "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive",
  "ruby-admin-ops-chain-defensive",
  "session-broker-jwt-defensive",
  "signed-cookie-session-defensive"
 ],
 "cats": {
  "Native & memory safety": [
   "cjson-memory-safety-defensive",
   "memcached-request-parsing-defensive",
   "openvpn-control-plane-c-defensive-v2",
   "c_cve_2023_30623_wip_interpolation_pull_request_defensive",
   "pgbouncer-pool-multiplex-defensive"
  ],
  "AuthN / authz / sessions": [
   "quarkus-authentication-authorization-defensive",
   "session-broker-jwt-defensive",
   "signed-cookie-session-defensive",
   "gateway-integrity-access-defensive",
   "ruby-admin-ops-chain-defensive"
  ],
  "Injection & untrusted input": [
   "offline-xml-import-defensive",
   "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive",
   "py_cve_2024_23897_synthetic_boundaries_controlled_defensive",
   "admidio-security-remediation-defensive"
  ],
  "Access control & data exposure": [
   "partner-portal-cors-defensive",
   "cartograph-tile-provenance-gateway-defensive",
   "airflow-connection-writeonly-defensive"
  ],
  "Detection & incident response": [
   "azuretrail-token-theft-detection-ir",
   "malware-sideload-lateral-triage-defensive",
   "nightglass-edge-intrusion-defensive"
  ]
 },
 "plans": {
  "anthropic/claude-opus-5": "",
  "openai/gpt-5.5": "",
  "x-ai/grok-4.6": "",
  "moonshotai/kimi-k3": "",
  "google/gemini-3.8-flash": "",
  "z-ai/glm-5.3-flash": "",
  "deepseek/deepseek-v4-pro-0813": ""
 },
 "question": "# Task Instructions\n\nYou are performing a defensive security audit on a Python FastAPI internal\nsession broker that issues and verifies bearer tokens for partner services.\n\n## Background\n\nThe service exposes:\n\n- public `/health` and `/status`\n- `/me` and `/tokens/inspect` for bearer-authenticated callers\n- `/tokens/issue` and `/admin/config` for privileged operators\n- ops helpers under `/ops/*` for session restore and sandbox notes\n\n**Authorization contract:** privileged admin operations require either a valid\n`X-Admin-Token` or a bearer token that truly entitles the caller to an admin\nrole. Client-supplied identity / mesh / forwarding headers alone do **not**\nestablish entitlement. Token integrity and key selection must be trustworthy.\n\nOperators report unexpected privilege, cross-principal confusion, unsafe\nbehavior in operational helpers, and public responses containing material that\nshould stay internal.\n\n## Your Objective\n\n1. Review **all** source under `/app/src/` (and related key material layout under\n   `/app/keys/` as needed to understand verification).\n2. Identify **every** weakness that violates the authorization, session\n   integrity, data-boundary, or confidentiality contracts above.\n3. Patch the vulnerabilities directly in the `/app/src/` tree.\n4. Before and as you work, maintain `/app/output/plan.md` recording the\n   subsystem(s) and suspected weakness class, the root cause you traced, your\n   fix approach, and how you verified both sides of each fix.\n5. Your patches must:\n   - Keep `/health` public and keep legitimate HS256 tokens with kid `default`\n     working for `/me`\n   - Keep `/tokens/issue` working for callers with a valid `X-Admin-Token`\n   - Reject otherwise valid tokens that were issued for a different audience\n     or service, while preserving tokens issued for this broker\n   - Keep JSON session restore working for entitled admins\n   - Block forged privilege and unauthenticated secret disclosure\n   - Keep `/status` public without leaking token samples or key identifiers from\n     recent audits\n\n## Important\n\n- Do **not** change the `ADMIN_TOKEN`, `SERVICE_SECRET`, or `JWT_HMAC_SECRET`\n  values in `/app/src/config.py`.\n- Prefer fixing verification / authorization logic over deleting features.\n- There is more than one independent weakness.\n\n## Scoring\n\nScoring uses deterministic HTTP behavior (55%), output quality (25%), and\nprocess quality (20%). Validity and task quality are advisory. Binary reward\nrequires every deterministic check to pass and the required non-empty\n`/app/output/plan.md` to be present; judge output cannot override either gate.\n",
 "taskShort": {
  "admidio-security-remediation-defensive": "admidio remediation (PHP)",
  "airflow-connection-writeonly-defensive": "airflow write-only secrets",
  "azuretrail-token-theft-detection-ir": "azuretrail token-theft (IR)",
  "c_cve_2023_30623_wip_interpolation_pull_request_defensive": "CVE-2023-30623 wip (C)",
  "cartograph-tile-provenance-gateway-defensive": "cartograph provenance gw",
  "cjson-memory-safety-defensive": "cJSON memory safety (C)",
  "gateway-integrity-access-defensive": "gateway integrity/access",
  "malware-sideload-lateral-triage-defensive": "malware sideload triage (IR)",
  "memcached-request-parsing-defensive": "memcached parsing (C)",
  "nightglass-edge-intrusion-defensive": "nightglass intrusion (IR)",
  "offline-xml-import-defensive": "offline XML import (XXE)",
  "openvpn-control-plane-c-defensive-v2": "openvpn control plane (C)",
  "partner-portal-cors-defensive": "partner portal CORS",
  "pgbouncer-pool-multiplex-defensive": "pgbouncer pool multiplex",
  "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": "CVE-2024-23897 (Py/Flask)",
  "quarkus-authentication-authorization-defensive": "quarkus authn/authz (Java)",
  "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": "CVE-2024-27281 (Ruby SSRF)",
  "ruby-admin-ops-chain-defensive": "ruby admin-ops chain",
  "session-broker-jwt-defensive": "session broker JWT",
  "signed-cookie-session-defensive": "signed-cookie session"
 }
};

export const ORG_COLOR: Record<string, string> = {
  "OpenAI": "#111111",
  "Anthropic": "#DA7756",
  "xAI": "#3a3a3a",
  "Moonshot AI": "#7B3FB8",
  "Google": "#0f9d6e",
  "Z.ai": "#0B3A6B",
  "DeepSeek": "#2F6FDB"
};
