// Generated from the cyberstrike OpenCode/Terminus runs (Aug 28-29 and Sep 3 2026).
// Source of truth: cyber_security_physera/research/data/trials.json. Do not hand-edit.

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
   "id": "openai/gpt-5.5",
   "label": "GPT-5.5",
   "org": "OpenAI",
   "solved": 8,
   "acc": 57.1,
   "checks": 94.9,
   "cost_total": 30.1,
   "cost_per_task": 2.15,
   "median_min": 6.8,
   "out_tokens": 196442,
   "sec_fail": 24,
   "func_fail": 5,
   "near_miss": 2,
   "radar": {
    "Auth & sessions": 91.7,
    "Injection & parsing": 99.3,
    "Secrets & exposure": 91.5,
    "Memory & concurrency": 100.0,
    "Incident response": 87.2
   },
   "radar_solved": {
    "Auth & sessions": "3/5",
    "Injection & parsing": "2/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "2/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 4.59,
     "min": 16.8,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 66,
     "n": 79,
     "pass_": false,
     "cost": 2.03,
     "min": 8.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 41,
     "n": 47,
     "pass_": false,
     "cost": 0.93,
     "min": 3.5,
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
     "passed": 48,
     "n": 49,
     "pass_": false,
     "cost": 2.22,
     "min": 8.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_cannot_inject_workflow_command_on_stdout"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 3.09,
     "min": 7.3,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 4.19,
     "min": 13.5,
     "cat": "solved",
     "failed": []
    },
    "docvault-api-audit-defensive": {
     "passed": 20,
     "n": 22,
     "pass_": false,
     "cost": 1.89,
     "min": 5.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_ssrf",
      "test_sec_request_body_limits"
     ]
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 3.08,
     "min": 13.0,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 1.56,
     "min": 5.0,
     "cat": "solved",
     "failed": []
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 1.46,
     "min": 6.3,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.11,
     "min": 3.6,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 10,
     "n": 16,
     "pass_": false,
     "cost": 1.2,
     "min": 5.5,
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
    "session-broker-jwt-defensive": {
     "passed": 20,
     "n": 20,
     "pass_": true,
     "cost": 1.68,
     "min": 7.5,
     "cat": "solved",
     "failed": []
    },
    "signed-cookie-session-defensive": {
     "passed": 23,
     "n": 24,
     "pass_": false,
     "cost": 1.07,
     "min": 4.1,
     "cat": "over_hardened",
     "failed": [
      "test_admin_session_via_admin_token_works"
     ]
    }
   },
   "harness": "OpenCode",
   "key": "openai/gpt-5.5"
  },
  {
   "id": "anthropic/claude-opus-5",
   "label": "Claude Opus 5",
   "org": "Anthropic",
   "solved": 8,
   "acc": 57.1,
   "checks": 95.8,
   "cost_total": 99.15,
   "cost_per_task": 7.08,
   "median_min": 25.5,
   "out_tokens": 741980,
   "sec_fail": 9,
   "func_fail": 15,
   "near_miss": 3,
   "radar": {
    "Auth & sessions": 99.0,
    "Injection & parsing": 95.6,
    "Secrets & exposure": 95.0,
    "Memory & concurrency": 96.4,
    "Incident response": 91.5
   },
   "radar_solved": {
    "Auth & sessions": "4/5",
    "Injection & parsing": "2/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "1/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 18.6,
     "min": 40.5,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 9.05,
     "min": 30.8,
     "cat": "spec_test_gap",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 43,
     "n": 47,
     "pass_": false,
     "cost": 1.15,
     "min": 4.8,
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
     "cost": 8.72,
     "min": 31.3,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 7.31,
     "min": 22.5,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 9.87,
     "min": 25.8,
     "cat": "solved",
     "failed": []
    },
    "docvault-api-audit-defensive": {
     "passed": 19,
     "n": 22,
     "pass_": false,
     "cost": 5.94,
     "min": 24.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_ssrf",
      "test_sec_parser_diff_dupkey",
      "test_sec_request_body_limits"
     ]
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 13,
     "n": 14,
     "pass_": false,
     "cost": 8.53,
     "min": 33.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 7.1,
     "min": 25.3,
     "cat": "solved",
     "failed": []
    },
    "offline-xml-import-defensive": {
     "passed": 92,
     "n": 106,
     "pass_": false,
     "cost": 6.94,
     "min": 25.6,
     "cat": "over_hardened",
     "failed": [
      "test_benign_report_import_works",
      "test_benign_validate_import_works",
      "test_raw64_benign_works",
      "test_stream_benign_works",
      "test_preview_benign_still_works",
      "test_batch_benign_still_works",
      "test_inspect_benign_works",
      "test_raw_benign_works"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 2.42,
     "min": 14.1,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 2.43,
     "min": 15.0,
     "cat": "solved",
     "failed": []
    },
    "session-broker-jwt-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 6.9,
     "min": 34.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_unauthenticated_inspect_rejected"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 4.18,
     "min": 22.6,
     "cat": "solved",
     "failed": []
    }
   },
   "harness": "OpenCode",
   "key": "anthropic/claude-opus-5"
  },
  {
   "id": "deepseek/deepseek-v4-pro-0813",
   "label": "DeepSeek V4 Pro",
   "org": "DeepSeek",
   "solved": 4,
   "acc": 28.6,
   "checks": 93.1,
   "cost_total": 4.04,
   "cost_per_task": 0.29,
   "median_min": 17.2,
   "out_tokens": 236297,
   "sec_fail": 35,
   "func_fail": 4,
   "near_miss": 2,
   "radar": {
    "Auth & sessions": 93.7,
    "Injection & parsing": 96.6,
    "Secrets & exposure": 89.5,
    "Memory & concurrency": 72.9,
    "Incident response": 91.5
   },
   "radar_solved": {
    "Auth & sessions": "2/5",
    "Injection & parsing": "1/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "0/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 15,
     "n": 16,
     "pass_": false,
     "cost": 0.53,
     "min": 17.3,
     "cat": "over_hardened",
     "failed": [
      "test_sec_php_upload_blocked_behavioral"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 65,
     "n": 79,
     "pass_": false,
     "cost": 0.23,
     "min": 10.9,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 43,
     "n": 47,
     "pass_": false,
     "cost": 0.1,
     "min": 6.6,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 47,
     "n": 49,
     "pass_": false,
     "cost": 0.37,
     "min": 17.2,
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
     "cost": 0.66,
     "min": 23.9,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 9,
     "n": 15,
     "pass_": false,
     "cost": 0.08,
     "min": 8.7,
     "cat": "no_output",
     "failed": [
      "func_findings_schema",
      "sec_unterminated_string_bounded",
      "sec_long_number_full_token",
      "sec_nesting_exhaustion_bounded",
      "sec_control_serialization_bounded",
      "sec_escape_decode_allocation"
     ]
    },
    "docvault-api-audit-defensive": {
     "passed": 19,
     "n": 22,
     "pass_": false,
     "cost": 0.41,
     "min": 21.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_ssrf",
      "test_sec_parser_diff_dupkey",
      "test_sec_request_body_limits"
     ]
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 12,
     "n": 14,
     "pass_": false,
     "cost": 0.57,
     "min": 28.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head",
      "test_l4_running_counter_no_wrap"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 25,
     "n": 26,
     "pass_": false,
     "cost": 0.28,
     "min": 21.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_forged_service_header_blocked"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.23,
     "min": 17.2,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.08,
     "min": 8.9,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.11,
     "min": 9.1,
     "cat": "solved",
     "failed": []
    },
    "session-broker-jwt-defensive": {
     "passed": 17,
     "n": 20,
     "pass_": false,
     "cost": 0.28,
     "min": 18.9,
     "cat": "incomplete_fix",
     "failed": [
      "test_expired_offline_access_token_rejected",
      "test_status_does_not_leak_token_samples",
      "test_unauthenticated_inspect_rejected"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 21,
     "n": 24,
     "pass_": false,
     "cost": 0.09,
     "min": 6.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_legacy_sha1_downgrade_blocked",
      "test_admin_flag_claim_not_entitling",
      "test_caps_array_not_entitling"
     ]
    }
   },
   "harness": "OpenCode",
   "key": "deepseek/deepseek-v4-pro-0813"
  },
  {
   "id": "moonshotai/kimi-k3",
   "label": "Kimi K3",
   "org": "Moonshot AI",
   "solved": 4,
   "acc": 28.6,
   "checks": 93.3,
   "cost_total": 23.89,
   "cost_per_task": 1.71,
   "median_min": 14.2,
   "out_tokens": 227199,
   "sec_fail": 35,
   "func_fail": 3,
   "near_miss": 3,
   "radar": {
    "Auth & sessions": 94.4,
    "Injection & parsing": 94.9,
    "Secrets & exposure": 89.5,
    "Memory & concurrency": 85.7,
    "Incident response": 89.4
   },
   "radar_solved": {
    "Auth & sessions": "2/5",
    "Injection & parsing": "0/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "1/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 15,
     "n": 16,
     "pass_": false,
     "cost": 4.6,
     "min": 18.1,
     "cat": "over_hardened",
     "failed": [
      "test_sec_php_upload_blocked_behavioral"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 65,
     "n": 79,
     "pass_": false,
     "cost": 1.15,
     "min": 12.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 42,
     "n": 47,
     "pass_": false,
     "cost": 0.74,
     "min": 8.6,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_attack_sequence_order_is_correct"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 46,
     "n": 49,
     "pass_": false,
     "cost": 1.02,
     "min": 13.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_file_cannot_escape_workspace",
      "test_sec_config_cannot_escape_workspace",
      "test_sec_title_cannot_inject_workflow_command_on_stdout"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 3.93,
     "min": 24.6,
     "cat": "solved",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 3.15,
     "min": 14.1,
     "cat": "solved",
     "failed": []
    },
    "docvault-api-audit-defensive": {
     "passed": 19,
     "n": 22,
     "pass_": false,
     "cost": 1.25,
     "min": 31.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_ssrf",
      "test_sec_parser_diff_dupkey",
      "test_sec_request_body_limits"
     ]
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 10,
     "n": 14,
     "pass_": false,
     "cost": 2.47,
     "min": 31.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_e4_cache_reflects_catchup",
      "test_e5_negative_cache_cleared_on_apply",
      "test_l2_copylocks_clear",
      "test_l4_running_counter_no_wrap"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 1.01,
     "min": 19.0,
     "cat": "solved",
     "failed": []
    },
    "offline-xml-import-defensive": {
     "passed": 103,
     "n": 106,
     "pass_": false,
     "cost": 1.63,
     "min": 19.3,
     "cat": "incomplete_fix",
     "failed": [
      "test_xinclude_internal_secret_blocked",
      "test_xinclude_passwd_blocked",
      "test_catalog_internal_secret_blocked"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.48,
     "min": 7.4,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 13,
     "n": 16,
     "pass_": false,
     "cost": 0.92,
     "min": 14.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 0.89,
     "min": 8.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_unauthenticated_inspect_rejected"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 23,
     "n": 24,
     "pass_": false,
     "cost": 0.64,
     "min": 7.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_legacy_sha1_downgrade_blocked"
     ]
    }
   },
   "harness": "OpenCode",
   "key": "moonshotai/kimi-k3"
  },
  {
   "id": "z-ai/glm-5.3-flash",
   "label": "GLM-5.3 Flash",
   "org": "Z.ai",
   "solved": 3,
   "acc": 21.4,
   "checks": 89.2,
   "cost_total": 0.79,
   "cost_per_task": 0.06,
   "median_min": 21.2,
   "out_tokens": 219868,
   "sec_fail": 53,
   "func_fail": 8,
   "near_miss": 1,
   "radar": {
    "Auth & sessions": 84.6,
    "Injection & parsing": 95.9,
    "Secrets & exposure": 88.5,
    "Memory & concurrency": 65.7,
    "Incident response": 83.0
   },
   "radar_solved": {
    "Auth & sessions": "1/5",
    "Injection & parsing": "1/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "0/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 15,
     "n": 16,
     "pass_": false,
     "cost": 0.24,
     "min": 36.8,
     "cat": "over_hardened",
     "failed": [
      "test_sec_php_upload_blocked_behavioral"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 66,
     "n": 79,
     "pass_": false,
     "cost": 0.07,
     "min": 23.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 39,
     "n": 47,
     "pass_": false,
     "cost": 0.01,
     "min": 9.0,
     "cat": "analysis_imprecision",
     "failed": [
      "test_functional::test_func_overall_pass",
      "test_security::test_sec_p1_capability_set_is_complete",
      "test_security::test_sec_p1_attck_mappings_are_correct",
      "test_security::test_sec_p1_subtechnique_exactness",
      "test_security::test_sec_p1_evidence_ids_are_grounded",
      "test_security::test_sec_p3_entry_vector_is_correct",
      "test_security::test_sec_p3_attack_sequence_order_is_correct",
      "test_security::test_sec_p3_evidence_ids_are_grounded"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 46,
     "n": 49,
     "pass_": false,
     "cost": 0.03,
     "min": 15.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_title_file_cannot_escape_workspace",
      "test_sec_config_cannot_escape_workspace",
      "test_sec_title_cannot_inject_workflow_command_on_stdout"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 76,
     "n": 86,
     "pass_": false,
     "cost": 0.11,
     "min": 34.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_func_clone_creates_child_in_east_project",
      "test_sec_clone_relay_tag_publish_must_not_publish_permit_west_vault_to_east",
      "test_sec_async_publish_blocks_laundered_vault_snapshot",
      "test_sec_copied_parent_provenance_seal_without_binding_rejected",
      "test_sec_no_cross_tenant_publish_permit_after_clone_attack_state",
      "test_sec_mass_assign_relay_tag_cannot_rebind_foreign_provenance_seal",
      "test_sec_clone_alias_attack_no_west_publish_permit_in_state_file",
      "test_sec_re_provenance_seal_after_alias_patch_required_for_publish"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 9,
     "n": 15,
     "pass_": false,
     "cost": 0.01,
     "min": 13.0,
     "cat": "no_output",
     "failed": [
      "func_findings_schema",
      "sec_unterminated_string_bounded",
      "sec_long_number_full_token",
      "sec_nesting_exhaustion_bounded",
      "sec_control_serialization_bounded",
      "sec_escape_decode_allocation"
     ]
    },
    "docvault-api-audit-defensive": {
     "passed": 18,
     "n": 22,
     "pass_": false,
     "cost": 0.05,
     "min": 17.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_path_traversal",
      "test_sec_ssrf",
      "test_sec_parser_diff_dupkey",
      "test_sec_request_body_limits"
     ]
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 10,
     "n": 14,
     "pass_": false,
     "cost": 0.07,
     "min": 24.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head",
      "test_e4_cache_reflects_catchup",
      "test_l2_copylocks_clear",
      "test_l4_running_counter_no_wrap"
     ]
    },
    "gateway-integrity-access-defensive": {
     "passed": 24,
     "n": 26,
     "pass_": false,
     "cost": 0.06,
     "min": 28.4,
     "cat": "incomplete_fix",
     "failed": [
      "test_delivery_augmentation_manifest_rejected",
      "test_holdout_manifest_payloads_blocked"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.04,
     "min": 23.1,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.01,
     "min": 8.6,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 10,
     "n": 16,
     "pass_": false,
     "cost": 0.03,
     "min": 21.2,
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
    "session-broker-jwt-defensive": {
     "passed": 16,
     "n": 20,
     "pass_": false,
     "cost": 0.05,
     "min": 21.1,
     "cat": "over_hardened",
     "failed": [
      "test_admin_token_can_issue_and_read_config",
      "test_status_does_not_leak_token_samples",
      "test_unauthenticated_inspect_rejected",
      "test_admin_bearer_can_read_config"
     ]
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 0.02,
     "min": 11.7,
     "cat": "solved",
     "failed": []
    }
   },
   "harness": "OpenCode",
   "key": "z-ai/glm-5.3-flash"
  },
  {
   "id": "moonshotai/kimi-k3",
   "key": "moonshotai/kimi-k3::terminus",
   "label": "Kimi K3 \u00b7 Terminus 2",
   "org": "Moonshot AI",
   "harness": "Terminus 2",
   "solved": 8,
   "acc": 57.1,
   "checks": 94.9,
   "cost_total": 8.85,
   "cost_per_task": 0.63,
   "median_min": 13.5,
   "out_tokens": 404179,
   "near_miss": 0,
   "radar": {
    "Auth & sessions": 96.2,
    "Injection & parsing": 98.6,
    "Secrets & exposure": 91.1,
    "Memory & concurrency": 100.0,
    "Incident response": 83.0
   },
   "radar_solved": {
    "Auth & sessions": "4/5",
    "Injection & parsing": "2/3",
    "Secrets & exposure": "1/3",
    "Memory & concurrency": "1/2",
    "Incident response": "0/1"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.97,
     "min": 23.1,
     "cat": "",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 65,
     "n": 79,
     "pass_": false,
     "cost": 0.82,
     "min": 14.3,
     "cat": "",
     "failed": [
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_support_bundle_masks_all_aggregated_sources",
      "test_sec_support_bundle_portable_attachment_is_not_recoverable_secret"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 39,
     "n": 47,
     "pass_": false,
     "cost": 0.2,
     "min": 4.8,
     "cat": "",
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
     "cat": "",
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
     "cat": "",
     "failed": []
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 1.12,
     "min": 23.9,
     "cat": "",
     "failed": []
    },
    "docvault-api-audit-defensive": {
     "passed": null,
     "n": null,
     "pass_": false,
     "cost": 0.79,
     "min": 20.1,
     "cat": "error",
     "failed": [],
     "error": "RewardFileNotFoundError"
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": null,
     "n": null,
     "pass_": false,
     "cost": 0,
     "min": 0.0,
     "cat": "error",
     "failed": [],
     "error": "RuntimeError"
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.46,
     "min": 6.5,
     "cat": "",
     "failed": []
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.66,
     "min": 11.4,
     "cat": "",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.26,
     "min": 5.1,
     "cat": "",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 13,
     "n": 16,
     "pass_": false,
     "cost": 0.3,
     "min": 8.1,
     "cat": "",
     "failed": [
      "test_sec_replay_same_code",
      "test_sec_replay_cross_endpoint",
      "test_sec_replay_snapshot"
     ]
    },
    "session-broker-jwt-defensive": {
     "passed": 20,
     "n": 20,
     "pass_": true,
     "cost": 0.53,
     "min": 16.8,
     "cat": "",
     "failed": []
    },
    "signed-cookie-session-defensive": {
     "passed": 24,
     "n": 24,
     "pass_": true,
     "cost": 0.42,
     "min": 12.7,
     "cat": "",
     "failed": []
    }
   },
   "errored": [
    "docvault-api-audit-defensive",
    "event-store-concurrency-integrity-defensive"
   ]
  }
 ],
 "tasks": [
  "admidio-security-remediation-defensive",
  "airflow-connection-writeonly-defensive",
  "azuretrail-token-theft-detection-ir",
  "c_cve_2023_30623_wip_interpolation_pull_request_defensive",
  "cartograph-tile-provenance-gateway-defensive",
  "cjson-memory-safety-defensive",
  "docvault-api-audit-defensive",
  "event-store-concurrency-integrity-defensive",
  "gateway-integrity-access-defensive",
  "offline-xml-import-defensive",
  "partner-portal-cors-defensive",
  "quarkus-authentication-authorization-defensive",
  "session-broker-jwt-defensive",
  "signed-cookie-session-defensive"
 ],
 "cats": {
  "Auth & sessions": [
   "quarkus-authentication-authorization-defensive",
   "session-broker-jwt-defensive",
   "signed-cookie-session-defensive",
   "gateway-integrity-access-defensive",
   "cartograph-tile-provenance-gateway-defensive"
  ],
  "Injection & parsing": [
   "admidio-security-remediation-defensive",
   "c_cve_2023_30623_wip_interpolation_pull_request_defensive",
   "offline-xml-import-defensive"
  ],
  "Secrets & exposure": [
   "airflow-connection-writeonly-defensive",
   "partner-portal-cors-defensive",
   "docvault-api-audit-defensive"
  ],
  "Memory & concurrency": [
   "cjson-memory-safety-defensive",
   "event-store-concurrency-integrity-defensive"
  ],
  "Incident response": [
   "azuretrail-token-theft-detection-ir"
  ]
 },
 "plans": {
  "openai/gpt-5.5": "# Defensive Security Audit Plan\n\n## Scope\n\n- Reviewed all Python source under `/app/src/`: route handlers, auth helpers, JWT utilities, key resolution, session restore, and sandbox file helpers.\n- Reviewed `/app/keys/` layout enough to understand expected `kid` mappings: `default` HMAC material and partner RSA public/private files.\n\n## Findings And Work Plan\n\n### Authentication And Authorization\n\n- Subsystem: `/app/src/auth.py`, routes depending on `bearer_claims` and `require_admin`.\n- Suspected weakness class: forged privilege and cross-principal confusion from client-supplied identity/mesh/forwarding headers.\n- Root cause traced: `bearer_claims` accepted `X-Actor-Id` and `X-Actor-Role` as overrides after JWT decode, and `require_admin` treated boolean/numeric role values as admin-equivalent.\n- Fix approach: bearer identity and role now come only from verified token claims; bearer admin requires exact `role == \"admin\"`; `X-Admin-Token` remains the separate privileged operator path.\n- Verification: `GET /me` with a valid user token plus forged actor headers still returns the token subject/role; `GET /admin/config` with a user token plus forged actor headers returns `403`; `GET /admin/config` and `POST /tokens/issue` with a valid `X-Admin-Token` return `200`.\n\n### JWT Integrity, Key Selection, And Audience\n\n- Subsystem: `/app/src/jwtutil.py`, `/app/src/keys.py`, `/app/keys/`.\n- Suspected weakness class: signature bypass, unsafe algorithms, untrusted `kid` path selection, audience/service confusion, and expiry bypass.\n- Root cause traced: decode paths disabled audience checks, accepted `alg=none`, trusted `X-Key-Source` to skip signature verification, manually verified HS tokens without audience validation, allowed `offline_access` to bypass expiry, and resolved `kid` by joining caller-controlled values to the keys directory.\n- Fix approach: removed request-header verification bypasses; restricted supported algorithms to `HS256` and `RS256`; restricted HMAC verification to `kid=default`; mapped partner RSA verification only to the known public key IDs; used PyJWT signature, expiry, and audience verification; rejected mismatched `service`/`svc` claims when present; preserved broker HS256 `kid=default` tokens.\n- Verification: valid HS256 `kid=default` broker tokens return `200` from `/me`; tokens with wrong `aud`, wrong `service`, `alg=none`, unsafe `kid`, or forged `X-Key-Source: mesh` return `401`; partner RS256 tokens with known `kid=partner` and broker audience return `200`; partner RS256 tokens with another audience return `401`; HS256 tokens using an RSA `kid` return `401`.\n\n### Public Response Confidentiality\n\n- Subsystem: `/status`, `/tokens/inspect`, `/debug/material` in `/app/src/main.py`.\n- Suspected weakness class: public disclosure of token samples, key identifiers, internal secrets, and key layout.\n- Root cause traced: `/status` returned raw recent audit entries while audit entries included token samples and `kid`; `/tokens/inspect` was callable without authenticating the caller; debug route registration treated the default string `\"false\"` as truthy and returned secrets, HMAC material, key names, admin-token prefix, and raw audit details.\n- Fix approach: kept `/status` public but returned only sanitized audit timestamp/type metadata; stopped recording token samples and key identifiers in audit entries; required a valid bearer caller for `/tokens/inspect`; gated debug material on explicit true-like values, required admin authorization when enabled, and removed secret/key material from its response.\n- Verification: `GET /status` returns `200` without authentication and does not contain token samples, `kid`, or `default` after `/me` and `/tokens/inspect` activity; `POST /tokens/inspect` without bearer auth returns `401`; authenticated inspect returns `200`; default `GET /debug/material` returns `404`; with `DEBUG_MODE=true`, unauthenticated debug returns `401`, admin debug returns `200`, and the response omits service/HMAC secrets and key filenames.\n\n### Operational Helpers\n\n- Subsystem: `/app/src/sessions.py`, `/app/src/files.py` under `/ops/*`.\n- Suspected weakness class: unsafe deserialization and sandbox path traversal.\n- Root cause traced: session restore fell back to `pickle.loads` on non-JSON input; file fetch joined user input directly under the sandbox root; sandbox fetch was not protected by admin authorization; startup could fail entirely when the runtime user could not create or access the sandbox directory.\n- Fix approach: kept JSON session restore for entitled admins; rejected non-JSON and non-base64 blobs; required admin authorization for sandbox fetch; constrained resolved sandbox paths to remain under the configured sandbox root, including symlink-aware resolution; converted sandbox setup/path errors into warnings or HTTP errors instead of process crashes/raw disclosure.\n- Verification: JSON session restore with a valid `X-Admin-Token` returns `200`; unauthenticated restore returns `401`; pickle restore returns `400`; sandbox traversal such as `../internal.secret` with admin auth returns `400`; unauthenticated sandbox fetch returns `401`; app import succeeds even when `/app/var/sandbox` cannot be created by the current user.\n\n## Verification Commands Run\n\n- `python -m compileall /app/src`\n- In-process `httpx.ASGITransport` checks covering `/health`, `/status`, `/me`, `/tokens/issue`, `/tokens/inspect`, `/admin/config`, `/ops/sessions/restore`, `/ops/files/fetch`, and `/debug/material`.\n- `DEBUG_MODE=true` in-process checks covering partner RSA key verification, wrong-audience rejection, disallowed HMAC `kid` rejection, and authenticated/sanitized debug behavior.\n",
  "anthropic/claude-opus-5": "# Session Broker \u2014 Defensive Security Audit: plan, findings, fixes, verification\n\nTarget: `/app/src/` (FastAPI internal session broker; PyJWT 2.8, key material in `/app/keys/`).\nArtifacts in this directory:\n\n| File | Contents |\n|---|---|\n| `plan.md` | this document (triage \u2192 root cause \u2192 fix \u2192 verification) |\n| `probe_contract.py` | 61-assertion contract probe (attack + regression pairs) |\n| `probe_edge_cases.py` | 38-assertion probe: partner RS256 flow, malformed tokens, restore/blob shapes |\n| `probe_debug_mode.py` | `/debug/material` gating check across `DEBUG_MODE` values |\n| `verification-before.txt` | probe output against the **original** code (32/61, 29/38, debug FAIL) |\n| `verification-after.txt` | probe output against the **patched** code (61/61, 38/38, debug PASS) |\n\n---\n\n## 0. Contract being defended\n\n1. Privileged operations (`/tokens/issue`, `/admin/config`, `/ops/sessions/restore`) require\n   **either** a valid `X-Admin-Token` **or** a bearer token that genuinely carries an admin\n   entitlement (signature-verified, server-selected key, correct audience, unexpired).\n2. Client-supplied identity / mesh / forwarding headers never establish identity or entitlement.\n3. Token integrity and key selection must be trustworthy: the **server**, not the token, decides\n   which algorithm and which key are acceptable.\n4. Data boundary: operational helpers stay inside their sandbox and never deserialize\n   code-bearing formats.\n5. Confidentiality: public endpoints disclose no secrets, token material, or key identifiers.\n\n## 1. Attack surface map (as found)\n\n| Subsystem | File | Exposure |\n|---|---|---|\n| App / routes / audit trail | `src/main.py` | `/health`, `/status` (public), `/me`, `/tokens/inspect`, `/tokens/issue`, `/admin/config`, `/debug/material` |\n| Request authentication | `src/auth.py` | bearer extraction, admin gate |\n| Token verification | `src/jwtutil.py` | decode path, algorithm + claim policy |\n| Key selection | `src/keys.py` | `kid` \u2192 key material |\n| Session restore | `src/sessions.py` | `/ops/sessions/restore` |\n| Sandbox notes | `src/files.py` | `/ops/files/fetch` |\n| Configuration | `src/config.py` | secrets, audience, directories (secret values must stay unchanged) |\n\nKey material layout: `/app/keys/default` (31-byte HMAC secret, identical to `JWT_HMAC_SECRET`),\n`/app/keys/partner.pem` (RSA **private** key), `/app/keys/partner.pub` (RSA public key). The\noriginal resolver used the `kid` as a file name inside this directory, which is what made the\nprivate key and the public key selectable as HMAC secrets.\n\n---\n\n## 2. Findings, root causes, fixes\n\nEvery finding below was reproduced against the original code and re-tested after patching; the\n\"verified\" column names the probe assertions (see `verification-before.txt` /\n`verification-after.txt`).\n\n### F1 \u2014 Client header disables signature verification (authn bypass) \u2014 `src/jwtutil.py`\n* **Class:** trust boundary violation / CWE-290, CWE-807. **Severity: critical.**\n* **Root cause:** `_mesh_short_circuit()` read `TRUSTED_MESH_HEADER` (`X-Key-Source`) straight off\n  the request; `mesh`, `1` or `true` made `decode_token()` return\n  `jwt.decode(..., verify_signature=False, verify_aud=False)`. A request header \u2014 fully under\n  attacker control \u2014 turned the whole verifier off, so any anonymous caller could assert\n  `role: admin` with an unsigned token.\n* **Fix:** `_mesh_short_circuit` is deleted. `decode_token()` still accepts a `request` argument for\n  call-site compatibility but **nothing** from the request influences verification (documented in\n  the docstring); `config.TRUSTED_MESH_HEADER` was renamed `UNTRUSTED_MESH_HEADER` so no future\n  reader mistakes it for a trust signal.\n* **Verified:** before `X-Key-Source: mesh` + unsigned admin token \u2192 `/me` 200, `/admin/config` 200,\n  `/tokens/issue` 200; after \u2192 401/401/401. Legitimate tokens are unaffected (`/me` 200).\n\n### F2 \u2014 `alg: none` accepted \u2014 `src/jwtutil.py`\n* **Class:** CWE-347 (improper signature verification). **Severity: critical.**\n* **Root cause:** the header-declared algorithm drove policy: `if alg.lower() == \"none\": return\n  jwt.decode(token, options={\"verify_signature\": False, ...})`. Any caller could forge claims by\n  declaring `alg=none` (any capitalisation).\n* **Fix:** algorithms are no longer read as policy. `_selected_key()` resolves the `kid` in the\n  registry and rejects the token unless the header algorithm is in that entry's allow-list\n  (`InvalidAlgorithmError`); `none` is in no allow-list, and PyJWT is always called with\n  `verify_signature: True` and an explicit `algorithms=[...]`.\n* **Verified:** before `alg=none`/`alg=NoNe` \u2192 200; after \u2192 401.\n\n### F3 \u2014 Attacker-controlled key selection: traversal + algorithm confusion \u2014 `src/keys.py`\n* **Class:** CWE-22 + CWE-347. **Severity: critical.**\n* **Root cause:** `resolve_verification_material()` built a path from the token's `kid`\n  (`os.path.join(KEYS_DIR, kid)`) and picked the key *family* from the token's `alg`. Three\n  distinct abuses followed:\n  1. **RS\u2192HS confusion:** `alg=HS256` + `kid=partner.pub` returned the RSA **public** key bytes as\n     an HMAC secret, so anyone holding public material could mint valid admin tokens.\n  2. **Traversal / absolute paths:** `os.path.join` with an absolute `kid` discards the base\n     directory, so `kid=/etc/hostname` (or `kid=../../etc/hostname`) turned any world-readable file\n     into the HMAC key \u2014 the attacker only needs to know the file's bytes.\n  3. **Silent fallback:** an unknown `kid` fell back to `JWT_HMAC_SECRET` (HS) or to `partner.pub`\n     (asymmetric), so key rotation/removal never actually invalidated anything.\n* **Fix:** `src/keys.py` was rewritten around a static, server-built registry:\n  `default` \u2192 the configured HMAC secret (plus the `keys/default` file content when it differs, so\n  file/config rotation cannot silently break verification) restricted to `HS256/384/512`;\n  `partner`, `partner.pub`, `partner.pem` \u2192 the **public** key from `keys/partner.pub` restricted\n  to `RS256/384/512` (registered only if the file really contains a public key). Lookups are pure\n  dictionary lookups \u2014 no path is ever built from request data, there is no fallback, and unknown\n  ids raise `UnknownKeyError` \u2192 401. The compatibility wrapper\n  `resolve_verification_material(kid, alg)` now also enforces the algorithm binding.\n* **Verified:** before `alg=HS256 kid=partner.pub` \u2192 200 on `/me` and `/admin/config`,\n  `kid=../../etc/hostname` \u2192 200, absolute `kid` \u2192 200, unknown `kid` \u2192 200; after all \u2192 401.\n  Genuine partner RS256 tokens still verify under all three partner `kid` aliases (200), a token\n  signed by a rogue RSA key is rejected (401).\n\n### F4 \u2014 In-token claim disables expiry \u2014 `src/jwtutil.py`\n* **Class:** CWE-613 (insufficient session expiration). **Severity: high.**\n* **Root cause:** on the HS path `if unverified.get(\"offline_access\") is True: return claims`\n  skipped the expiry check, and on the RS path the same claim set `verify_ex\n\n[... truncated ...]",
  "deepseek/deepseek-v4-pro-0813": "# Session Broker \u2014 Defensive Audit Plan\n\n## Subsystems reviewed\n- `src/auth.py` \u2014 bearer extraction, client header handling, admin authorization\n- `src/jwtutil.py` \u2014 token decode/verify (custom HS256 path + pyjwt path)\n- `src/keys.py` \u2014 verification key material resolution by `kid`\n- `src/main.py` \u2014 routes, audit trail, `/status`, `/tokens/issue`, debug material\n- `src/sessions.py` \u2014 `/ops/sessions/restore` blob restore\n- `src/files.py` \u2014 `/ops/files/fetch` sandbox notes\n- `/app/keys` \u2014 HMAC secret file (`default`), partner RSA keypair (`partner.pem` / `partner.pub`)\n\n## Suspected weaknesses\n1. Authentication bypass via client-supplied mesh header (`X-Key-Source: mesh`).\n2. `alg: none` tokens accepted without signature.\n3. Client-supplied `X-Actor-Id` / `X-Actor-Role` headers override verified claims\n   (cross-principal confusion, admin escalation).\n4. HS256 path never validates audience; RS path explicitly disables it\n   (`verify_aud: False`), so tokens minted for other audiences/services verify.\n5. HS/RS key confusion: HMAC algorithms accept arbitrary PEM files (e.g.\n   `kid=partner.pub`) as the HMAC secret \u2014 the public key is public, so forged\n   HS256 tokens verify. `kid` path traversal and silent key fallbacks.\n6. `/status` (public) returns raw audit records including token samples\n   (`sample`) and key identifiers (`kid`).\n7. `/ops/sessions/restore` falls back to `pickle.loads` (arbitrary code\n   execution) for non-JSON blobs.\n8. `/ops/files/fetch` path traversal (`..`) escapes the sandbox; can read key\n   material (`../../keys/default`).\n9. `/tokens/issue` merges `body.extra` after standard claims, letting extras\n   override `aud` / `role` / `sub` of issued tokens.\n10. `DEBUG_MODE` `/debug/material` endpoint dumps secrets unauthenticated\n    (when enabled).\n\n## Root causes traced\n- `jwtutil._mesh_short_circuit` trusts a spoofable request header.\n- `decode_token` special-cases `alg=none` with `verify_signature: False`.\n- `auth.bearer_claims` copies claims then overwrites `sub`/`role` from headers.\n- HS path (`_hs256_verify_and_load`) checks only signature + exp; RS path sets\n  `verify_aud: False` while passing `audience` (pyjwt 2.8 ignores the audience\n  when `verify_aud` is False).\n- `keys.resolve_verification_material` returns the *content* of any file named\n  by `kid` for HS algorithms, and silently falls back to `partner.pub` for\n  unknown asymmetric kids.\n- `main.status` returns `_audit.recent(5)` verbatim; `inspect`/`me` record\n  `sample` and `kid`.\n- `sessions._decode` falls back to `pickle.loads`.\n- `files._resolve` only rejects leading `/` or `\\`.\n- `main.issue_token` places `**body.extra` last in the claim dict.\n\n## Fix approach\n1. Remove the mesh short-circuit entirely; headers never influence\n   verification (`decode_token` ignores `request`).\n2. Reject `alg=none` explicitly.\n3. Remove `X-Actor-Id` / `X-Actor-Role` claim overrides in `bearer_claims`.\n4. Always validate audience in `decode_token`: reject tokens whose `aud` claim\n   (when present) does not include `session-broker`, for both HS and RS paths;\n   broker-issued tokens carry the correct `aud` and keep working.\n5. Split key resolution: HS algs only use the broker HMAC secret\n   (`kid` must be `default`); asymmetric algs only use PEM *public* key files\n   resolved by an explicitly named, sanitized `kid` (no separators, no `..`,\n   no fallback).\n6. Sanitize audit events in `/status` (strip `sample`, `kid`).\n7. Make session restore JSON-only (remove `pickle.loads`).\n8. Resolve note paths against the real sandbox root and reject anything whose\n   `realpath` escapes `SANDBOX_ROOT`.\n9. Build issued claims as `{**body.extra, <standard claims>}` so standard\n   claims cannot be overridden.\n10. Gate `DEBUG_MODE` `/debug/material` behind `require_admin`.\n\n## Verification (both sides of each fix)\n- Legit HS256 token (kid `default`, aud `session-broker`) \u2192 `/me` 200.\n- Same token with `aud: other-service` \u2192 `/me` 401.\n- `alg:none` token claiming admin \u2192 401; `X-Key-Source: mesh` garbage \u2192 401.\n- User token + `X-Actor-Role: admin` \u2192 `/admin/config` 403.\n- `X-Admin-Token` \u2192 `/admin/config` 200 and `/tokens/issue` 200.\n- HS256 forged with public key as HMAC secret (`kid=partner.pub`) \u2192 401;\n  legitimate RS256 partner token (`kid=partner.pub`, correct aud) \u2192 200;\n  RS256 partner token with wrong aud \u2192 401.\n- `/status` stays 200 and contains no `sample`/`kid` after triggering audits.\n- `/ops/sessions/restore` with JSON blob (admin) \u2192 200; pickle blob \u2192 400.\n- `/ops/files/fetch?name=../../keys/default` \u2192 400/404, never returns secret.\n- `/tokens/issue` with `extra.aud=evil` still yields `aud=session-broker`.\n- Exercise a live server (uvicorn + requests) after each patch (TestClient is\n  unavailable here: httpx 0.28 dropped the `app=` kwarg used by fastapi 0.100).\n\n## Verification results (live uvicorn + requests)\nRan 3 suites against a freshly started server (env: JWT_KEYS_DIR=/app/keys):\n- main suite: 37/37 passed (health, /me legit + wrong-aud, alg:none, mesh\n  header, X-Actor-Id/Role spoofing, X-Admin-Token, issue/admin access, bearer\n  admin access, HMAC-with-public-PEM forgery, unknown/traversal kids, HS512\n  rejection, RS256 partner accept + wrong-aud reject + private-kid reject,\n  expired token, inspect, /status redaction, JSON restore, pickle rejection,\n  traversal + secret non-disclosure, extra-claim override protection).\n- forgery suite: 4/4 passed (HS256 signed with public PEM as secret under\n  `kid=partner.pub` and `kid=default`, wrong HMAC secret, `alg:none`).\n- role suite: 6/6 passed (roles `1`, `\"1\"`, `true`, `True`, `\"user\"` get 403;\n  only `\"admin\"` gets 200 on `/admin/config`).\n- Negative and positive sides of every fix were exercised; `/health` and\n  `/status` remain public (200), broker-issued HS256 tokens (kid `default`)\n  keep working end-to-end via `/tokens/issue` \u2192 `/me`.\n",
  "moonshotai/kimi-k3": "# Defensive Security Audit \u2014 Session Broker \u2014 Remediation Plan\n\nDate: 2026-08-28\nScope: `/app/src/` (authn/authz, token verification, key selection, ops helpers,\npublic endpoints) plus `/app/keys/` layout to understand verification material.\n\n## Method\n\n1. Read every module under `/app/src/` and the key material layout.\n2. Trace each request path against the stated contracts (authorization, session\n   integrity, data boundary, confidentiality).\n3. Patch verification/authorization logic (features preserved, not deleted).\n4. Verify both sides of each fix with live HTTP tests (legitimate flow keeps\n   working; attack flow is rejected).\n\n## Weakness inventory (suspected -> confirmed during code tracing)\n\n### A. `src/auth.py` \u2014 forged privilege via client identity headers\n- Class: authorization bypass / cross-principal confusion.\n- `bearer_claims()` overwrites verified `sub`/`role` with `X-Actor-Id` /\n  `X-Actor-Role` request headers AFTER token verification. Any caller with any\n  (even foreign) token can claim `X-Actor-Role: admin`.\n- Also: `require_admin()` accepts `role == 1`, `\"1\"`, `True` \u2014 type-confused\n  privilege instead of a true `\"admin\"` role entitlement.\n\n### B. `src/jwtutil.py` \u2014 signature-verification bypasses\n- Class: token integrity failure.\n- `_mesh_short_circuit()`: header `X-Key-Source: mesh|1|true` disables\n  signature AND audience verification entirely (client header => trust).\n- `alg: none` tokens are decoded with signature verification disabled.\n- HS path never validates `aud`; RS path passes `verify_aud: False` while\n  supplying an audience (no-op) => tokens issued for another audience/service\n  are accepted.\n- `offline_access: true` claim disables expiry checks in both HS and RS paths.\n- Attacker-controlled `alg` header is fed straight to `jwt.decode`\n  (`algorithms=[alg]`), and the hand-rolled HS verifier always uses SHA-256\n  even for HS384/HS512 labels (downgrade/confusion surface).\n\n### C. `src/keys.py` \u2014 untrusted key selection\n- Class: key confusion / path traversal.\n- `kid` from the unverified token header is joined into a filesystem path:\n  `os.path.join(KEYS_DIR, kid)`. Absolute `kid` values or `../` escape the\n  keys dir; `kid=/app/keys/partner.pub` with `alg=HS256` makes the broker\n  HMAC-verify with the *public* key as secret (classic RS->HS confusion);\n  `kid=partner.pem` loads the private key as verification material.\n- Unknown RSA kids silently fall back to `partner.pub`.\n\n### D. `src/sessions.py` \u2014 unsafe deserialization in session restore\n- Class: RCE / unsafe deserialization.\n- `_decode()` falls back to `pickle.loads()` when JSON parsing fails. Admin\n  gate exists, but a single forged-admin primitive (see A/B) turns this into\n  unauthenticated RCE; pickle has no legitimate role here.\n\n### E. `src/files.py` \u2014 path traversal in sandbox note fetch\n- Class: data-boundary violation / unauthenticated secret disclosure.\n- `_resolve()` only blocks leading `/` or `\\`; `..` segments escape\n  `SANDBOX_ROOT` (e.g. `../../keys/partner.pem`, `../../src/config.py`).\n  Endpoint has no authentication at all.\n\n### F. `src/main.py` \u2014 public disclosure of internal material\n- Class: confidentiality failure.\n- `/status` returns raw audit events which include `sample=<token prefix>`,\n  `kid`, and `sub` recorded by `/me` and `/tokens/inspect`.\n- `/tokens/inspect` stores `body.token[:48]` (a live bearer-token fragment)\n  into the audit trail in the first place.\n- `/debug/material` is registered whenever env `DEBUG_MODE` is any non-empty\n  string \u2014 the default `\"false\"` is truthy in Python \u2014 and it dumps\n  `SERVICE_SECRET`, the full `JWT_HMAC_SECRET`, `ADMIN_TOKEN` prefix, key\n  listing, and audit data with no authentication.\n\n## Fix approach (per subsystem)\n\n- `auth.py`: delete the `X-Actor-*` claim override; require strict\n  `role == \"admin\"` for bearer-based admin.\n- `jwtutil.py`: delete mesh short-circuit and `alg:none` branch; strict\n  algorithm allowlist (HS256 for HMAC, RS256/384/512 for PEM path); verify\n  signature, expiry, and audience (`aud == EXPECTED_AUDIENCE`) on every path;\n  remove `offline_access` expiry bypass; delegate validation to pyjwt with\n  explicit options.\n- `keys.py`: sanitize `kid` (strict charset, no `..`, no separators) and\n  allowlist key selection: HS256 -> `default` HMAC material only; RSA ->\n  `partner.pub` only; never load `partner.pem` for verification.\n- `sessions.py`: JSON-only restore (drop pickle fallback), keep admin gate.\n- `files.py`: resolve via `os.path.realpath` and require containment inside\n  the real `SANDBOX_ROOT`.\n- `main.py`: `/status` exposes only `{ts, type}` per recent event; stop\n  recording token samples in the audit trail; register `/debug/material` only\n  on a strictly parsed true flag AND behind `require_admin`.\n- `config.py`: unchanged (secrets/values preserved as required).\n\n## Verification log\n\nAll tests executed against `uvicorn src.main:app` (127.0.0.1) with a scratch\nsandbox (`JWT_VAR_ROOT=/tmp/opencode/var`); both sides of every fix verified.\nFull harness: 44/44 checks pass.\n\n### Legitimacy preserved (positive side)\n- `GET /health` \u2192 200 unauthenticated.\n- `POST /tokens/issue` with valid `X-Admin-Token` \u2192 200 token; issue without\n  admin credential \u2192 401.\n- `GET /me` with broker-issued HS256 `kid=default` token \u2192 200, correct `sub`.\n- `GET /me` with RS256 `kid=partner.pub` token signed by `partner.pem`,\n  `aud=session-broker` \u2192 200 (RSA path intact).\n- `GET /me` with `X-Key-Source: mesh` on an otherwise valid token \u2192 200\n  (header now ignored, not fatal).\n- Token with `aud` as a list containing `session-broker` \u2192 accepted by pyjwt.\n- `POST /ops/sessions/restore` + admin + base64(JSON object) \u2192 200 with\n  parsed session; non-object JSON \u2192 400 (unchanged semantics).\n- `GET /ops/files/fetch?name=note.txt` inside the sandbox \u2192 200 with content.\n- `GET /status` \u2192 200, still shows recent activity `{ts, type}`.\n- `/debug/material` with `DEBUG_MODE=true` + valid `X-Admin-Token` \u2192 200\n  (feature preserved for privileged operators).\n\n### Attacks rejected (negative side)\n- Wrong-audience token (`aud=partner-api`, even admin-issued) \u2192 401 on `/me`\n  and `/tokens/inspect`; token missing `aud` \u2192 401.\n- `alg=none` forged admin token \u2192 401 (`/me`, `/admin/config`).\n- Bad-signature token + `X-Key-Source: mesh` \u2192 401; `alg=none` + mesh \u2192 401.\n- `X-Actor-Role: admin` / `X-Actor-Id` over a low-priv token \u2192 403 on\n  `/admin/config`; `/me` still reports the token's real `sub`.\n- `role` coercions (`1`, `\"1\"`, `true`) \u2192 403; genuine `\"admin\"` role \u2192 200.\n- `kid` attacks (hand-crafted, bypassing pyjwt's client-side guard):\n  `kid=/app/keys/partner.pub` or `kid=partner.pub` with HS256+PEM-as-secret \u2192\n  401; `kid=../../keys/default` \u2192 401; `kid=partner.pem` \u2192 401.\n- Expired token with `offline_access: true` \u2192 401.\n- Tampered payload (flipped role, original signature) \u2192 401.\n- `alg` label outside allowlist (HS384, none, garbage) \u2192 401; RS256 without\n  `kid` \u2192 401 (previously broken anyway).\n- Pickle payload to `/ops/s\n\n[... truncated ...]",
  "z-ai/glm-5.3-flash": "# Session Broker \u2014 Defensive Security Audit Plan\n\n## Scope reviewed\n\n- `/app/src/main.py` (routes, audit trail, debug endpoint)\n- `/app/src/auth.py` (bearer verification, admin gate)\n- `/app/src/jwtutil.py` (token decode/encode)\n- `/app/src/keys.py` (verification key resolution)\n- `/app/src/config.py` (unchanged \u2014 secrets preserved)\n- `/app/src/sessions.py`, `/app/src/files.py` (ops helpers)\n- `/app/keys/` layout: `default` = HMAC secret for kid `default`; `partner.pem`/`partner.pub` = RSA keypair for partner (RS256) tokens.\n\n## Weaknesses identified (subsystem / class / root cause / fix)\n\n### W1 \u2014 Verification bypass via client-controlled header\n- Subsystem: `jwtutil.decode_token`\n- Class: broken authentication / verification bypass\n- Root cause: `_mesh_short_circuit()` trusts the client-supplied `X-Key-Source`\n  header and, when it is `mesh|1|true`, decodes tokens with\n  `verify_signature: False` and `verify_aud: False` \u2014 anyone can forge any\n  claims (incl. `role: admin`).\n- Fix: remove the short-circuit entirely; every token is cryptographically\n  verified regardless of headers.\n\n### W2 \u2014 `alg: none` accepted\n- Subsystem: `jwtutil.decode_token`\n- Class: unsigned-token forgery\n- Root cause: explicit branch decodes `alg=none` tokens without any signature.\n- Fix: reject `alg=none` (and missing alg) outright.\n\n### W3 \u2014 HS path: no audience check, exp bypass via `offline_access`\n- Subsystem: `jwtutil._hs256_verify_and_load` / HS branch\n- Class: cross-principal / cross-service token acceptance; expired-session\n  acceptance\n- Root cause: the manual HMAC verifier checks only the signature and a bespoke\n  `exp` comparison; it never validates `aud`, and any token (even expired)\n  claiming `offline_access: true` bypasses expiry. The RSA branch likewise sets\n  `verify_aud: False` (so the `audience=` argument is ignored) and disables\n  `verify_exp` on the same self-asserted claim.\n- Fix: delegate to PyJWT with `algorithms=[\"HS256\"]`, `audience=EXPECTED_AUDIENCE`,\n  `verify_aud/verify_exp` enabled for both HMAC and RSA paths; delete the\n  `offline_access` bypass and the hand-rolled verifier. Additionally the HS\n  branch now rejects any `kid` other than `default` (defense-in-depth with W4;\n  found by verification testing).\n\n### W3b \u2014 `/tokens/issue` could rebind the audience via `extra`\n- Subsystem: `main.issue_token`\n- Class: token-integrity / cross-service token confusion\n- Root cause: caller-supplied `extra` fields were merged after the base claims,\n  so `extra={\"aud\": \"other-svc\"}` produced tokens bound to a foreign service.\n- Fix: merge `extra` first and force `aud: EXPECTED_AUDIENCE` last, so every\n  broker-issued token stays bound to this broker.\n\n### W4 \u2014 Key confusion + path traversal via `kid`\n- Subsystem: `keys.resolve_verification_material` (used by `jwtutil`)\n- Class: algorithm/key-confusion forgery; arbitrary file read as key material\n- Root cause: `kid` from the token header is used directly as a filename under\n  `KEYS_DIR`. With `alg=HS256`, `kid=partner.pub` loads the *public* RSA key\n  contents as the HMAC secret \u2014 an attacker knows that \"secret\" and can forge\n  admin tokens. `kid=../../path` also escapes the keys directory.\n- Fix: never derive filesystem paths from header input. HMAC verification is\n  only permitted for `kid == \"default\"` and always uses `JWT_HMAC_SECRET`;\n  asymmetric verification uses a fixed allowlist mapping\n  (`partner`/`partner.pub` \u2192 `partner.pub`, `partner.pem` \u2192 `partner.pem`);\n  any other `kid`, or an HMAC alg outside the default kid, is rejected.\n\n### W5 \u2014 Forged privilege / principal override via headers\n- Subsystem: `auth.bearer_claims`, `auth.require_admin`\n- Class: broken authorization (forged role, cross-principal confusion)\n- Root cause: `X-Actor-Id` / `X-Actor-Role` request headers overwrite the\n  verified token's `sub`/`role`, so any caller can self-assign `role: admin`\n  or impersonate another principal. Additionally `require_admin` accepts\n  `role in {1, \"1\", True}` (type-juggling) instead of the admin role string.\n- Fix: remove the header-override logic; accept only\n  `isinstance(role, str) and role == \"admin\"`.\n\n### W6 \u2014 `/status` leaks token samples and key identifiers\n- Subsystem: `main.py` (`AuditTrail`, `/tokens/inspect`, `/status`)\n- Class: confidential-data disclosure on a public endpoint\n- Root cause: `/tokens/inspect` records `sample=token[:48]` and the header\n  `kid` in the audit trail; `/me` records `kid` too; public `/status` returns\n  the raw recent audit events.\n- Fix: never store token material or key identifiers (record only event type,\n  timestamp, subject); additionally sanitize events at exposure time in\n  `/status` to an allowlist of safe fields.\n\n### W7 \u2014 Unauthenticated secret disclosure via `/debug/material`\n- Subsystem: `main.py`\n- Class: secret disclosure / debug backdoor\n- Root cause: `DEBUG_MODE = os.getenv(\"DEBUG_MODE\", \"false\")` is a non-empty\n  string (`\"false\"`), which is truthy \u2014 the endpoint that returns\n  `SERVICE_SECRET`, the raw `JWT_HMAC_SECRET`, the admin token prefix and the\n  key listing is registered **by default**, with no authentication.\n- Fix: register only when the env var is explicitly enabled\n  (`\"1\"/\"true\"/\"yes\"`; default unset \u2192 disabled), require admin\n  authorization via `require_admin`, and return only non-reversible\n  fingerprints (no raw secrets).\n\n### W8 \u2014 `SERVICE_SECRET` in `/admin/config` response\n- Subsystem: `main.py`\n- Class: secret exposure\n- Root cause: the endpoint hands the internal service secret to every admin\n  caller; it is not needed for any admin function.\n- Fix: return configuration status only (no secret material).\n\n### W9 \u2014 Pickle deserialization in session restore (RCE)\n- Subsystem: `sessions._decode`\n- Class: unsafe deserialization\n- Root cause: non-JSON blobs fall back to `pickle.loads` on attacker-influenced\n  bytes \u2192 arbitrary code execution on restore.\n- Fix: JSON-only decoding (pickle path deleted); malformed payloads \u2192 400.\n  JSON restore for entitled admins keeps working.\n\n### W10 \u2014 Path traversal in sandbox note fetch\n- Subsystem: `files._resolve`\n- Class: data-boundary violation / arbitrary file read\n- Root cause: only absolute paths are rejected; `../` sequences escape\n  `SANDBOX_ROOT` (e.g. `../../../etc/passwd`).\n- Fix: canonicalize with `os.path.realpath` and require the result to stay\n  within the real `SANDBOX_ROOT`; reject otherwise.\n\n## Fix-verification matrix (both sides per fix)\n\n| Check | Positive (must work) | Negative (must fail) |\n|---|---|---|\n| W1/W2/W3 | HS256 `kid=default`, `aud=session-broker` token \u2192 `/me` 200; RS256 partner token `aud=session-broker` \u2192 `/me` 200 | `X-Key-Source: mesh` + garbage token \u2192 401; `alg=none` \u2192 401; wrong-aud HS/RS token \u2192 401; expired token \u2192 401; expired `offline_access` token \u2192 401 |\n| W4 | `kid=default` HS256 works | `alg=HS256, kid=partner.pub` (public-key-as-HMAC forgery) \u2192 401; `kid=../../etc/passwd` \u2192 401 |\n| W5 | `/tokens/issue` with `X-Admin-Token` \u2192 200; bearer `role: \"admin\"` \u2192 ad\n\n[... truncated ...]"
 },
 "question": "# Task Instructions\n\nYou are performing a defensive security audit on a Python FastAPI internal\nsession broker that issues and verifies bearer tokens for partner services.\n\n## Background\n\nThe service exposes:\n\n- public `/health` and `/status`\n- `/me` and `/tokens/inspect` for bearer-authenticated callers\n- `/tokens/issue` and `/admin/config` for privileged operators\n- ops helpers under `/ops/*` for session restore and sandbox notes\n\n**Authorization contract:** privileged admin operations require either a valid\n`X-Admin-Token` or a bearer token that truly entitles the caller to an admin\nrole. Client-supplied identity / mesh / forwarding headers alone do **not**\nestablish entitlement. Token integrity and key selection must be trustworthy.\n\nOperators report unexpected privilege, cross-principal confusion, unsafe\nbehavior in operational helpers, and public responses containing material that\nshould stay internal.\n\n## Your Objective\n\n1. Review **all** source under `/app/src/` (and related key material layout under\n   `/app/keys/` as needed to understand verification).\n2. Identify **every** weakness that violates the authorization, session\n   integrity, data-boundary, or confidentiality contracts above.\n3. Patch the vulnerabilities directly in the `/app/src/` tree.\n4. Before and as you work, maintain `/app/output/plan.md` recording the\n   subsystem(s) and suspected weakness class, the root cause you traced, your\n   fix approach, and how you verified both sides of each fix.\n5. Your patches must:\n   - Keep `/health` public and keep legitimate HS256 tokens with kid `default`\n     working for `/me`\n   - Keep `/tokens/issue` working for callers with a valid `X-Admin-Token`\n   - Reject otherwise valid tokens that were issued for a different audience\n     or service, while preserving tokens issued for this broker\n   - Keep JSON session restore working for entitled admins\n   - Block forged privilege and unauthenticated secret disclosure\n   - Keep `/status` public without leaking token samples or key identifiers from\n     recent audits\n\n## Important\n\n- Do **not** change the `ADMIN_TOKEN`, `SERVICE_SECRET`, or `JWT_HMAC_SECRET`\n  values in `/app/src/config.py`.\n- Prefer fixing verification / authorization logic over deleting features.\n- There is more than one independent weakness.\n\n## Scoring\n\nScoring uses deterministic HTTP behavior (55%), output quality (25%), and\nprocess quality (20%). Validity and task quality are advisory. Binary reward\nrequires every deterministic check to pass and the required non-empty\n`/app/output/plan.md` to be present; judge output cannot override either gate.\n",
 "taskShort": {
  "admidio-security-remediation-defensive": "admidio (PHP)",
  "airflow-connection-writeonly-defensive": "airflow secrets",
  "azuretrail-token-theft-detection-ir": "azuretrail IR",
  "c_cve_2023_30623_wip_interpolation_pull_request_defensive": "CVE-2023-30623 (C)",
  "cartograph-tile-provenance-gateway-defensive": "cartograph gateway",
  "cjson-memory-safety-defensive": "cJSON (C)",
  "gateway-integrity-access-defensive": "gateway integrity",
  "offline-xml-import-defensive": "XML import (XXE)",
  "partner-portal-cors-defensive": "partner CORS",
  "quarkus-authentication-authorization-defensive": "quarkus authz (Java)",
  "session-broker-jwt-defensive": "session broker JWT",
  "signed-cookie-session-defensive": "signed cookie",
  "docvault-api-audit-defensive": "docvault audit",
  "event-store-concurrency-integrity-defensive": "event store (Go)"
 }
} as BenchData;

export const ORG_COLOR: Record<string, string> = {
  OpenAI: "#111111",
  Anthropic: "#DA7756",
  DeepSeek: "#2F6FDB",
  "Moonshot AI": "#7B3FB8",
  "Z.ai": "#0B3A6B",
};
