// Generated from the Cyberstrike Terminus-2 runs (Sept 2026).
// Source of truth: cyber_security_physera/blog/data/trials_18.json (+ taxonomy_18).
// Regenerate with: python3 cyber_security_physera/research/gen_cyberlatch_data.py — do not hand-edit.

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
   "acc": 61.1,
   "checks": 97.1,
   "cost_total": 97.53,
   "cost_per_task": 5.42,
   "median_min": 26.7,
   "out_tokens": 2280795,
   "sec_fail": 9,
   "func_fail": 4,
   "near_miss": 3,
   "radar": {
    "Systems & memory safety": 97.8,
    "AuthN / authz / sessions": 97.5,
    "Injection & untrusted input": 97.3,
    "Access control & data exposure": 98.9,
    "Detection & incident response": 93.3
   },
   "radar_solved": {
    "Systems & memory safety": "3/4",
    "AuthN / authz / sessions": "3/4",
    "Injection & untrusted input": "3/4",
    "Access control & data exposure": "1/3",
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
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness"
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
     "passed": 85,
     "n": 86,
     "pass_": false,
     "cost": 6.56,
     "min": 36.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_project_publish_policy_cannot_override_vault_ownership"
     ]
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 13,
     "n": 14,
     "pass_": false,
     "cost": 7.98,
     "min": 67.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head"
     ]
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
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 3.62,
     "min": 26.6,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.96,
     "min": 12.0,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 10.92,
     "min": 77.5,
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
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
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
    }
   }
  },
  {
   "id": "deepseek/deepseek-v4.1-flash",
   "key": "deepseek-v4.1-flash",
   "label": "DeepSeek V4.1 Flash",
   "org": "DeepSeek",
   "harness": "Terminus 2",
   "solved": 10,
   "acc": 55.6,
   "checks": 93.0,
   "cost_total": 12.17,
   "cost_per_task": 0.68,
   "median_min": 23.5,
   "out_tokens": 6824037,
   "sec_fail": 36,
   "func_fail": 13,
   "near_miss": 2,
   "radar": {
    "Systems & memory safety": 100.0,
    "AuthN / authz / sessions": 98.8,
    "Injection & untrusted input": 98.3,
    "Access control & data exposure": 85.1,
    "Detection & incident response": 76.6
   },
   "radar_solved": {
    "Systems & memory safety": "4/4",
    "AuthN / authz / sessions": "3/4",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.74,
     "min": 31.2,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 66,
     "n": 79,
     "pass_": false,
     "cost": 0.33,
     "min": 14.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_preview_update_handoff_masks_nested_provider_secrets",
      "test_sec_preview_update_masks_nested_provider_secrets",
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 41,
     "n": 47,
     "pass_": false,
     "cost": 0.16,
     "min": 8.4,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 0.88,
     "min": 41.2,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 66,
     "n": 86,
     "pass_": false,
     "cost": 0.97,
     "min": 46.9,
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
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 0.9,
     "min": 44.6,
     "cat": "solved",
     "failed": []
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 1.58,
     "min": 98.8,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 0.46,
     "min": 22.5,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 7,
     "n": 10,
     "pass_": false,
     "cost": 0.45,
     "min": 24.1,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_schema_and_identity",
      "test_func_phase1_evidence_and_iocs",
      "test_func_phase3_iocs_and_remediation"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 51,
     "n": 69,
     "pass_": false,
     "cost": 0.25,
     "min": 8.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_category_is_correct",
      "test_p1_primary_objective_is_correct",
      "test_p1_primary_role_is_correct",
      "test_p1_capability_set_is_complete",
      "test_p1_attck_mappings_are_covered",
      "test_p1_subtechnique_exactness",
      "test_p1_evidence_ids_are_grounded",
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_single_selection_separates",
      "test_p2_no_two_selection_separates"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.47,
     "min": 22.3,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.14,
     "min": 6.8,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 0.88,
     "min": 45.9,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 9,
     "n": 9,
     "pass_": true,
     "cost": 2.48,
     "min": 119.8,
     "cat": "solved",
     "failed": []
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 63,
     "n": 65,
     "pass_": false,
     "cost": 0.64,
     "min": 24.9,
     "cat": "over_hardened",
     "failed": [
      "test_func_audit_receipt_still_replays_safe_board_digest",
      "test_func_trusted_partner_import_still_works"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.09,
     "min": 5.3,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 27,
     "n": 28,
     "pass_": false,
     "cost": 0.45,
     "min": 22.9,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_and_plan_contract"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 0.28,
     "min": 13.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
    }
   }
  },
  {
   "id": "openai/gpt-6-astra",
   "key": "gpt-6-astra",
   "label": "GPT-6 Astra",
   "org": "OpenAI",
   "harness": "Terminus 2",
   "solved": 10,
   "acc": 55.6,
   "checks": 89.5,
   "cost_total": 81.53,
   "cost_per_task": 4.53,
   "median_min": 14.7,
   "out_tokens": 582884,
   "sec_fail": 21,
   "func_fail": 14,
   "near_miss": 2,
   "radar": {
    "Systems & memory safety": 100.0,
    "AuthN / authz / sessions": 98.8,
    "Injection & untrusted input": 72.3,
    "Access control & data exposure": 90.0,
    "Detection & incident response": 85.5
   },
   "radar_solved": {
    "Systems & memory safety": "4/4",
    "AuthN / authz / sessions": "3/4",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 4.77,
     "min": 17.1,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 2.4,
     "min": 10.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 43,
     "n": 47,
     "pass_": false,
     "cost": 1.16,
     "min": 4.5,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 2.64,
     "min": 14.0,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 65,
     "n": 86,
     "pass_": false,
     "cost": 4.32,
     "min": 15.8,
     "cat": "over_hardened",
     "failed": [
      "test_func_west_attach_stage_seal_publish_own_vault",
      "test_func_east_attach_seal_publish_works",
      "test_func_jobs_process_endpoint_works",
      "test_func_publish_permits_list_works",
      "test_func_west_publish_existing_template_still_works",
      "test_sec_stage_purpose_not_accepted_for_publish",
      "test_sec_east_legitimate_publish_vault_east_ok_still_works",
      "test_sec_west_legitimate_publish_still_works",
      "test_sec_vault_snapshot_cannot_supply_foreign_vault_ref",
      "test_sec_publish_endpoint_not_404_for_authorized"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 30.25,
     "min": 140.0,
     "cat": "solved",
     "failed": []
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 2.84,
     "min": 12.5,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 3.25,
     "min": 16.2,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 8,
     "n": 10,
     "pass_": false,
     "cost": 1.46,
     "min": 6.3,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_evidence_and_iocs",
      "test_func_phase3_iocs_and_remediation"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 62,
     "n": 69,
     "pass_": false,
     "cost": 1.64,
     "min": 5.2,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p2_each_selection_is_load_bearing",
      "test_p2_no_two_selection_separates",
      "test_p2_no_three_selection_separates",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs",
      "test_p3_staged_not_exfiltrated_excluded",
      "test_p3_confirmed_files_exact"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 3.66,
     "min": 15.7,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.82,
     "min": 7.1,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 4.61,
     "min": 14.3,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 9,
     "n": 9,
     "pass_": true,
     "cost": 3.8,
     "min": 16.3,
     "cat": "solved",
     "failed": []
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 0,
     "n": 1,
     "pass_": false,
     "cost": 4.12,
     "min": 15.8,
     "cat": "over_hardened",
     "failed": [
      "test_func_workspace_hygiene"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 1.12,
     "min": 5.1,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 25,
     "n": 28,
     "pass_": false,
     "cost": 2.93,
     "min": 15.1,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_and_plan_contract",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 4.76,
     "min": 37.9,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
    }
   }
  },
  {
   "id": "anthropic/claude-fable-5.1",
   "key": "claude-fable-5.1",
   "label": "Claude Fable 5.1",
   "org": "Anthropic",
   "harness": "Terminus 2",
   "solved": 9,
   "acc": 50.0,
   "checks": 96.6,
   "cost_total": 217.58,
   "cost_per_task": 9.84,
   "median_min": 36.0,
   "out_tokens": 2785836,
   "sec_fail": 16,
   "func_fail": 11,
   "near_miss": 4,
   "radar": {
    "Systems & memory safety": 98.6,
    "AuthN / authz / sessions": 98.8,
    "Injection & untrusted input": 94.9,
    "Access control & data exposure": 97.1,
    "Detection & incident response": 92.8
   },
   "radar_solved": {
    "Systems & memory safety": "3/4",
    "AuthN / authz / sessions": "3/4",
    "Injection & untrusted input": "1/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "1/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 15,
     "n": 16,
     "pass_": false,
     "cost": 15.28,
     "min": 56.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_access_control_mechanism_exists"
     ]
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 7.75,
     "min": 28.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 41,
     "n": 47,
     "pass_": false,
     "cost": 2.4,
     "min": 8.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 9.07,
     "min": 34.5,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 77,
     "n": 86,
     "pass_": false,
     "cost": 26.67,
     "min": 97.5,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_schema_valid_and_phase_files_exist",
      "test_func_phase1_schema_keys_present",
      "test_func_phase2_findings_mirror_present",
      "test_func_phase3_schema_keys_present",
      "test_sec_findings_cwe_allowed",
      "test_sec_findings_affected_files_exist",
      "test_sec_findings_not_all_low_severity",
      "test_sec_findings_root_cause_and_description_non_trivial",
      "test_sec_project_publish_policy_cannot_override_vault_ownership"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 40.4,
     "min": 81.8,
     "cat": "solved",
     "failed": []
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 18.97,
     "min": 76.6,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 4.76,
     "min": 15.6,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 10,
     "n": 10,
     "pass_": true,
     "cost": 4.26,
     "min": 16.5,
     "cat": "solved",
     "failed": []
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 63,
     "n": 69,
     "pass_": false,
     "cost": 5.37,
     "min": 21.6,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p3_attack_sequence_recall",
      "test_p3_sequence_evidence_is_grounded",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs",
      "test_p3_staged_not_exfiltrated_excluded",
      "test_p3_confirmed_files_exact"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 103,
     "n": 106,
     "pass_": false,
     "cost": 9.46,
     "min": 37.5,
     "cat": "over_hardened",
     "failed": [
      "test_import_routes_must_not_be_deleted",
      "test_catalog_internal_secret_blocked",
      "test_catalog_benign_works"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 4.37,
     "min": 16.3,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 12.56,
     "min": 57.7,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 8,
     "n": 9,
     "pass_": false,
     "cost": 16.94,
     "min": 72.8,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 65,
     "n": 65,
     "pass_": true,
     "cost": 17.6,
     "min": 63.7,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 4.26,
     "min": 16.3,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 25,
     "n": 28,
     "pass_": false,
     "cost": 12.22,
     "min": 46.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_and_plan_contract",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 5.23,
     "min": 21.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
    }
   }
  },
  {
   "id": "openai/gpt-5.6-sol",
   "key": "gpt-5.6-sol",
   "label": "GPT-5.6 Sol",
   "org": "OpenAI",
   "harness": "Terminus 2",
   "solved": 9,
   "acc": 50.0,
   "checks": 94.6,
   "cost_total": 27.3,
   "cost_per_task": 1.52,
   "median_min": 20.0,
   "out_tokens": 1146591,
   "sec_fail": 8,
   "func_fail": 11,
   "near_miss": 4,
   "radar": {
    "Systems & memory safety": 94.4,
    "AuthN / authz / sessions": 95.0,
    "Injection & untrusted input": 97.8,
    "Access control & data exposure": 99.4,
    "Detection & incident response": 85.0
   },
   "radar_solved": {
    "Systems & memory safety": "3/4",
    "AuthN / authz / sessions": "3/4",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "1/3",
    "Detection & incident response": "0/3"
   },
   "per_task": {
    "admidio-security-remediation-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 1.55,
     "min": 25.2,
     "cat": "solved",
     "failed": []
    },
    "airflow-connection-writeonly-defensive": {
     "passed": 78,
     "n": 79,
     "pass_": false,
     "cost": 0.97,
     "min": 19.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_component_profile_rejects_body_target_confusion"
     ]
    },
    "azuretrail-token-theft-detection-ir": {
     "passed": 43,
     "n": 47,
     "pass_": false,
     "cost": 0.21,
     "min": 3.9,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness"
     ]
    },
    "c_cve_2023_30623_wip_interpolation_pull_request_defensive": {
     "passed": 49,
     "n": 49,
     "pass_": true,
     "cost": 0.88,
     "min": 20.6,
     "cat": "solved",
     "failed": []
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 85,
     "n": 86,
     "pass_": false,
     "cost": 1.8,
     "min": 27.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_west_publish_existing_template_still_works"
     ]
    },
    "cjson-memory-safety-defensive": {
     "passed": 15,
     "n": 15,
     "pass_": true,
     "cost": 6.63,
     "min": 45.6,
     "cat": "solved",
     "failed": []
    },
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 3.14,
     "min": 31.4,
     "cat": "solved",
     "failed": []
    },
    "gateway-integrity-access-defensive": {
     "passed": 26,
     "n": 26,
     "pass_": true,
     "cost": 1.29,
     "min": 15.6,
     "cat": "solved",
     "failed": []
    },
    "malware-sideload-lateral-triage-defensive": {
     "passed": 8,
     "n": 10,
     "pass_": false,
     "cost": 0.36,
     "min": 6.0,
     "cat": "analysis_imprecision",
     "failed": [
      "test_func_phase1_evidence_and_iocs",
      "test_func_phase3_iocs_and_remediation"
     ]
    },
    "nightglass-edge-intrusion-defensive": {
     "passed": 61,
     "n": 69,
     "pass_": false,
     "cost": 0.59,
     "min": 6.7,
     "cat": "analysis_imprecision",
     "failed": [
      "test_p1_attck_mappings_are_covered",
      "test_p1_evidence_ids_are_grounded",
      "test_p3_attack_sequence_recall",
      "test_p3_confirmed_ioc_set_is_correct",
      "test_p3_no_benign_or_dead_iocs",
      "test_p3_staged_not_exfiltrated_excluded",
      "test_p3_confirmed_files_exact",
      "test_p3_remediation_actions_are_exact"
     ]
    },
    "offline-xml-import-defensive": {
     "passed": 106,
     "n": 106,
     "pass_": true,
     "cost": 0.64,
     "min": 12.0,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.27,
     "min": 5.1,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 3.48,
     "min": 47.4,
     "cat": "solved",
     "failed": []
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 8,
     "n": 9,
     "pass_": false,
     "cost": 0.82,
     "min": 19.4,
     "cat": "incomplete_fix",
     "failed": [
      "sec_session_service_not_multiplexed"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 64,
     "n": 65,
     "pass_": false,
     "cost": 1.78,
     "min": 33.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_audit_receipt_still_replays_safe_board_digest"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 16,
     "n": 16,
     "pass_": true,
     "cost": 0.45,
     "min": 11.4,
     "cat": "solved",
     "failed": []
    },
    "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": {
     "passed": 26,
     "n": 28,
     "pass_": false,
     "cost": 0.91,
     "min": 23.6,
     "cat": "over_hardened",
     "failed": [
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 16,
     "n": 20,
     "pass_": false,
     "cost": 1.52,
     "min": 35.7,
     "cat": "over_hardened",
     "failed": [
      "test_func_findings_cover_each_repaired_component",
      "test_func_findings_schema_is_valid",
      "test_func_findings_use_component_relevant_cwe_ids",
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
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
   "acc": 44.4,
   "checks": 91.4,
   "cost_total": 2.72,
   "cost_per_task": 0.15,
   "median_min": 65.1,
   "out_tokens": 3675577,
   "sec_fail": 41,
   "func_fail": 21,
   "near_miss": 1,
   "radar": {
    "Systems & memory safety": 98.9,
    "AuthN / authz / sessions": 93.8,
    "Injection & untrusted input": 87.5,
    "Access control & data exposure": 85.1,
    "Detection & incident response": 89.5
   },
   "radar_solved": {
    "Systems & memory safety": "3/4",
    "AuthN / authz / sessions": "2/4",
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
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_preview_update_handoff_masks_nested_provider_secrets",
      "test_sec_preview_update_masks_nested_provider_secrets",
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets"
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
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct"
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
     "passed": 66,
     "n": 86,
     "pass_": false,
     "cost": 0.42,
     "min": 64.1,
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 14,
     "n": 14,
     "pass_": true,
     "cost": 0.39,
     "min": 95.8,
     "cat": "solved",
     "failed": []
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
     "cost": 0.09,
     "min": 25.9,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.04,
     "min": 12.6,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 55,
     "n": 57,
     "pass_": false,
     "cost": 0.29,
     "min": 220.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_request_authority_precedes_state_changes",
      "test_sec_browser_origin_cannot_reach_local_administration"
     ]
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
      "test_func_audit_receipt_still_replays_safe_board_digest",
      "test_func_notice_preview_and_publish_preserve_safe_markup",
      "test_sec_notice_preview_and_published_view_have_no_active_html"
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
      "test_func_exports_keep_safe_values_and_ticket_roundtrip",
      "test_func_rollup_manifest_renders_safe_includes",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
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
   "acc": 44.4,
   "checks": 81.4,
   "cost_total": 74.43,
   "cost_per_task": 4.13,
   "median_min": 13.5,
   "out_tokens": 1773806,
   "sec_fail": 38,
   "func_fail": 22,
   "near_miss": 2,
   "radar": {
    "Systems & memory safety": 60.5,
    "AuthN / authz / sessions": 71.3,
    "Injection & untrusted input": 96.4,
    "Access control & data exposure": 90.0,
    "Detection & incident response": 93.7
   },
   "radar_solved": {
    "Systems & memory safety": "1/4",
    "AuthN / authz / sessions": "1/4",
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
     "passed": 65,
     "n": 86,
     "pass_": false,
     "cost": 4.23,
     "min": 17.4,
     "cat": "over_hardened",
     "failed": [
      "test_func_west_attach_stage_seal_publish_own_vault",
      "test_func_east_attach_seal_publish_works",
      "test_func_jobs_process_endpoint_works",
      "test_func_publish_permits_list_works",
      "test_func_west_publish_existing_template_still_works",
      "test_sec_stage_purpose_not_accepted_for_publish",
      "test_sec_east_legitimate_publish_vault_east_ok_still_works",
      "test_sec_west_legitimate_publish_still_works",
      "test_sec_vault_snapshot_cannot_supply_foreign_vault_ref",
      "test_sec_publish_endpoint_not_404_for_authorized"
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 9,
     "n": 14,
     "pass_": false,
     "cost": 4.48,
     "min": 19.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head",
      "test_e5_negative_cache_cleared_on_apply",
      "test_l2_copylocks_clear",
      "test_l4_running_counter_no_wrap"
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
     "cost": 2.43,
     "min": 11.1,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 1.54,
     "min": 6.4,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 52,
     "n": 57,
     "pass_": false,
     "cost": 10.19,
     "min": 64.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_template_data_is_not_reinterpreted",
      "test_sec_legacy_root_must_be_credential_data",
      "test_sec_legacy_sequence_root_is_not_executed",
      "test_sec_legacy_credential_members_are_not_interpreted",
      "test_sec_shared_graph_tail_does_not_bypass_path_depth"
     ]
    },
    "pgbouncer-pool-multiplex-defensive": {
     "passed": 6,
     "n": 9,
     "pass_": false,
     "cost": 6.84,
     "min": 28.1,
     "cat": "over_hardened",
     "failed": [
      "func_findings_schema",
      "sec_tracked_parameter_restored_on_handover",
      "sec_new_client_not_seeded_from_live_session"
     ]
    },
    "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": {
     "passed": 65,
     "n": 65,
     "pass_": true,
     "cost": 5.58,
     "min": 21.3,
     "cat": "solved",
     "failed": []
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 0,
     "n": 16,
     "pass_": false,
     "cost": 1.27,
     "min": 7.9,
     "cat": "over_hardened",
     "failed": [
      "test_func_admin_reveal",
      "test_func_anon_denied",
      "test_func_distinct_codes_work",
      "test_func_findings_schema",
      "test_func_health",
      "test_func_metrics_with_admin_token",
      "test_func_public_info",
      "test_func_snapshot_reveal",
      "test_func_unknown_404",
      "test_func_user_cannot_authorize"
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
      "test_func_rollup_manifest_renders_safe_includes",
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
      "test_sec_rollup_manifest_snapshots_nested_content_at_issue_time"
     ]
    },
    "ruby-admin-ops-chain-defensive": {
     "passed": 19,
     "n": 20,
     "pass_": false,
     "cost": 2.24,
     "min": 11.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_logout_invalidates_all_older_admin_sessions"
     ]
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
   "acc": 38.9,
   "checks": 87.2,
   "cost_total": 22.91,
   "cost_per_task": 1.27,
   "median_min": 11.0,
   "out_tokens": 1023445,
   "sec_fail": 34,
   "func_fail": 20,
   "near_miss": 2,
   "radar": {
    "Systems & memory safety": 97.5,
    "AuthN / authz / sessions": 67.5,
    "Injection & untrusted input": 97.1,
    "Access control & data exposure": 94.1,
    "Detection & incident response": 79.5
   },
   "radar_solved": {
    "Systems & memory safety": "2/4",
    "AuthN / authz / sessions": "1/4",
    "Injection & untrusted input": "2/4",
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
      "test_sec_component_profile_rejects_body_target_confusion",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_preview_update_handoff_masks_nested_provider_secrets",
      "test_sec_preview_update_masks_nested_provider_secrets",
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets"
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
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct"
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
      "test_sec_debug_does_not_leak_secret_env",
      "test_sec_title_cannot_inject_workflow_command_on_stdout"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 1.79,
     "min": 15.8,
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 13,
     "n": 14,
     "pass_": false,
     "cost": 1.51,
     "min": 25.5,
     "cat": "incomplete_fix",
     "failed": [
      "test_l2_copylocks_clear"
     ]
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
     "passed": 105,
     "n": 106,
     "pass_": false,
     "cost": 0.57,
     "min": 7.9,
     "cat": "over_hardened",
     "failed": [
      "test_transform_benign_works"
     ]
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.28,
     "min": 4.2,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 55,
     "n": 57,
     "pass_": false,
     "cost": 3.78,
     "min": 43.7,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_shared_graph_tail_does_not_bypass_path_depth",
      "test_sec_archive_lineage_survives_replacement_and_activation"
     ]
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
     "passed": 0,
     "n": 16,
     "pass_": false,
     "cost": 0.54,
     "min": 11.1,
     "cat": "over_hardened",
     "failed": [
      "test_func_admin_reveal",
      "test_func_anon_denied",
      "test_func_distinct_codes_work",
      "test_func_findings_schema",
      "test_func_health",
      "test_func_metrics_with_admin_token",
      "test_func_public_info",
      "test_func_snapshot_reveal",
      "test_func_unknown_404",
      "test_func_user_cannot_authorize"
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
      "test_func_trusted_mirror_allows_same_host_redirect_without_private_backend",
      "test_func_trusted_mirror_fetches_indicator_feed_without_localhost_resolver",
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
   "acc": 38.9,
   "checks": 85.9,
   "cost_total": 30.05,
   "cost_per_task": 1.67,
   "median_min": 10.6,
   "out_tokens": 874761,
   "sec_fail": 44,
   "func_fail": 16,
   "near_miss": 2,
   "radar": {
    "Systems & memory safety": 86.2,
    "AuthN / authz / sessions": 64.9,
    "Injection & untrusted input": 98.7,
    "Access control & data exposure": 94.1,
    "Detection & incident response": 88.0
   },
   "radar_solved": {
    "Systems & memory safety": "1/4",
    "AuthN / authz / sessions": "1/4",
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
      "test_sec_component_profile_rejects_body_target_confusion",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_preview_update_handoff_masks_nested_provider_secrets",
      "test_sec_preview_update_masks_nested_provider_secrets",
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets"
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
      "test_func_overall_pass",
      "test_sec_fusion_category_matches_behavior",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct",
      "test_sec_p3_entry_vector_is_correct"
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
      "test_sec_config_cannot_escape_workspace",
      "test_sec_title_file_cannot_escape_workspace"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 86,
     "n": 86,
     "pass_": true,
     "cost": 1.26,
     "min": 10.4,
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 11,
     "n": 14,
     "pass_": false,
     "cost": 0.83,
     "min": 9.8,
     "cat": "incomplete_fix",
     "failed": [
      "test_e4_cache_reflects_catchup",
      "test_e5_negative_cache_cleared_on_apply",
      "test_l4_running_counter_no_wrap"
     ]
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
     "cost": 0.62,
     "min": 5.7,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.37,
     "min": 4.4,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 49,
     "n": 57,
     "pass_": false,
     "cost": 1.45,
     "min": 27.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_independent_same_user_ceremonies_complete",
      "test_sec_template_data_is_not_reinterpreted",
      "test_sec_legacy_root_must_be_credential_data",
      "test_sec_legacy_sequence_root_is_not_executed",
      "test_sec_legacy_credential_members_are_not_interpreted",
      "test_sec_shared_graph_tail_does_not_bypass_path_depth",
      "test_sec_browser_origin_cannot_reach_local_administration",
      "test_sec_syncable_completion_order_preserves_counter_and_last_backup_state"
     ]
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
      "test_func_required_output_artifacts_exist_and_parse"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 0,
     "n": 16,
     "pass_": false,
     "cost": 0.3,
     "min": 8.1,
     "cat": "over_hardened",
     "failed": [
      "test_func_admin_reveal",
      "test_func_anon_denied",
      "test_func_distinct_codes_work",
      "test_func_findings_schema",
      "test_func_health",
      "test_func_metrics_with_admin_token",
      "test_func_public_info",
      "test_func_snapshot_reveal",
      "test_func_unknown_404",
      "test_func_user_cannot_authorize"
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
   "acc": 33.3,
   "checks": 90.8,
   "cost_total": 24.47,
   "cost_per_task": 1.36,
   "median_min": 12.5,
   "out_tokens": 1631283,
   "sec_fail": 34,
   "func_fail": 5,
   "near_miss": 3,
   "radar": {
    "Systems & memory safety": 86.7,
    "AuthN / authz / sessions": 94.9,
    "Injection & untrusted input": 97.5,
    "Access control & data exposure": 93.8,
    "Detection & incident response": 79.1
   },
   "radar_solved": {
    "Systems & memory safety": "1/4",
    "AuthN / authz / sessions": "2/4",
    "Injection & untrusted input": "2/4",
    "Access control & data exposure": "1/3",
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
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_preview_update_handoff_masks_nested_provider_secrets",
      "test_sec_preview_update_masks_nested_provider_secrets",
      "test_sec_reader_bulk_export_does_not_embed_secrets",
      "test_sec_reader_detail_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_masks_uncovered_and_nested_secrets",
      "test_sec_reader_diagnostics_reveal_flag_cannot_force_secrets",
      "test_sec_reader_export_masks_uncovered_aws_secret",
      "test_sec_reader_history_masks_uncovered_and_nested_secrets",
      "test_sec_reader_list_masks_uncovered_and_nested_secrets"
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
      "test_func_overall_pass",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_evidence_ids_are_grounded"
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
      "test_sec_debug_does_not_leak_secret_env",
      "test_sec_long_strip_prefix_does_not_crash",
      "test_sec_strip_prefix_absent_from_title_does_not_crash",
      "test_sec_title_cannot_inject_step_output",
      "test_sec_title_cannot_inject_workflow_command_on_stdout",
      "test_sec_untrusted_config_regex_cannot_bypass_gate",
      "test_sec_untrusted_config_strip_prefix_cannot_bypass_gate",
      "test_sec_wip_with_annotations_disabled_does_not_crash"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 85,
     "n": 86,
     "pass_": false,
     "cost": 1.2,
     "min": 11.2,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_project_publish_policy_cannot_override_vault_ownership"
     ]
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 12,
     "n": 14,
     "pass_": false,
     "cost": 1.26,
     "min": 13.1,
     "cat": "incomplete_fix",
     "failed": [
      "test_e2_checkpoint_covers_committed_head"
     ]
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
     "cost": 1.35,
     "min": 12.4,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.42,
     "min": 6.1,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 57,
     "n": 57,
     "pass_": true,
     "cost": 1.75,
     "min": 15.1,
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
      "test_sec_records_direct_queries_do_not_leak_private_rows",
      "test_sec_saved_record_profile_revalidates_public_scope_and_columns"
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
   "acc": 22.2,
   "checks": 79.7,
   "cost_total": 14.79,
   "cost_per_task": 0.82,
   "median_min": 34.3,
   "out_tokens": 1907796,
   "sec_fail": 84,
   "func_fail": 21,
   "near_miss": 1,
   "radar": {
    "Systems & memory safety": 73.9,
    "AuthN / authz / sessions": 67.6,
    "Injection & untrusted input": 94.2,
    "Access control & data exposure": 78.2,
    "Detection & incident response": 85.7
   },
   "radar_solved": {
    "Systems & memory safety": "0/4",
    "AuthN / authz / sessions": "1/4",
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
      "test_func_findings_schema_is_valid",
      "test_func_reader_cannot_validate_component_profile",
      "test_sec_component_profile_apply_flag_stays_dry_run",
      "test_sec_component_profile_reader_cannot_apply_or_mutate",
      "test_sec_component_profile_rejects_body_target_confusion",
      "test_sec_detail_response_headers_do_not_leak_secrets",
      "test_sec_editor_bulk_export_remains_write_only",
      "test_sec_editor_diagnostics_remains_write_only",
      "test_sec_editor_history_remains_write_only",
      "test_sec_editor_ui_detail_remains_write_only"
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
      "test_func_overall_pass",
      "test_sec_fusion_category_matches_behavior",
      "test_sec_p1_attck_mappings_are_correct",
      "test_sec_p1_capability_set_is_complete",
      "test_sec_p1_evidence_ids_are_grounded",
      "test_sec_p1_subtechnique_exactness",
      "test_sec_p3_attack_sequence_order_is_correct"
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
      "test_sec_config_cannot_escape_workspace",
      "test_sec_debug_does_not_leak_secret_env",
      "test_sec_title_cannot_inject_workflow_command_on_stdout",
      "test_sec_title_file_cannot_escape_workspace",
      "test_sec_wip_with_annotations_disabled_does_not_crash"
     ]
    },
    "cartograph-tile-provenance-gateway-defensive": {
     "passed": 76,
     "n": 86,
     "pass_": false,
     "cost": 1.41,
     "min": 56.6,
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
    "event-store-concurrency-integrity-defensive": {
     "passed": 11,
     "n": 14,
     "pass_": false,
     "cost": 0.93,
     "min": 56.0,
     "cat": "incomplete_fix",
     "failed": [
      "test_e4_cache_reflects_catchup",
      "test_e5_negative_cache_cleared_on_apply",
      "test_l4_running_counter_no_wrap"
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
     "cost": 0.37,
     "min": 14.4,
     "cat": "solved",
     "failed": []
    },
    "partner-portal-cors-defensive": {
     "passed": 47,
     "n": 47,
     "pass_": true,
     "cost": 0.23,
     "min": 7.6,
     "cat": "solved",
     "failed": []
    },
    "passkey-ceremony-broker-rust-defensive": {
     "passed": 52,
     "n": 57,
     "pass_": false,
     "cost": 0.59,
     "min": 53.6,
     "cat": "incomplete_fix",
     "failed": [
      "test_sec_template_data_is_not_reinterpreted",
      "test_sec_legacy_root_must_be_credential_data",
      "test_sec_legacy_sequence_root_is_not_executed",
      "test_sec_legacy_credential_members_are_not_interpreted",
      "test_sec_shared_graph_tail_does_not_bypass_path_depth"
     ]
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
      "test_func_audit_receipt_still_replays_safe_board_digest",
      "test_func_casefile_capability_still_replays_safe_brief",
      "test_func_package_preview_and_collection_digest_still_work",
      "test_sec_compose_argfile_private_read_and_public_symlink_do_not_disclose",
      "test_sec_delivery_packet_revalidates_inline_profiles_and_return_refs",
      "test_sec_mirror_catalog_rejects_encoded_path_escape_and_symlink",
      "test_sec_rejects_symlink_escape_inside_public_root",
      "test_sec_report_manifest_recursively_validates_appendices"
     ]
    },
    "quarkus-authentication-authorization-defensive": {
     "passed": 0,
     "n": 16,
     "pass_": false,
     "cost": 0.23,
     "min": 9.0,
     "cat": "over_hardened",
     "failed": [
      "test_func_admin_reveal",
      "test_func_anon_denied",
      "test_func_distinct_codes_work",
      "test_func_findings_schema",
      "test_func_health",
      "test_func_metrics_with_admin_token",
      "test_func_public_info",
      "test_func_snapshot_reveal",
      "test_func_unknown_404",
      "test_func_user_cannot_authorize"
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
  "event-store-concurrency-integrity-defensive",
  "gateway-integrity-access-defensive",
  "malware-sideload-lateral-triage-defensive",
  "nightglass-edge-intrusion-defensive",
  "offline-xml-import-defensive",
  "partner-portal-cors-defensive",
  "passkey-ceremony-broker-rust-defensive",
  "pgbouncer-pool-multiplex-defensive",
  "py_cve_2024_23897_synthetic_boundaries_controlled_defensive",
  "quarkus-authentication-authorization-defensive",
  "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive",
  "ruby-admin-ops-chain-defensive"
 ],
 "cats": {
  "Systems & memory safety": [
   "cjson-memory-safety-defensive",
   "c_cve_2023_30623_wip_interpolation_pull_request_defensive",
   "pgbouncer-pool-multiplex-defensive",
   "event-store-concurrency-integrity-defensive"
  ],
  "AuthN / authz / sessions": [
   "quarkus-authentication-authorization-defensive",
   "gateway-integrity-access-defensive",
   "ruby-admin-ops-chain-defensive",
   "passkey-ceremony-broker-rust-defensive"
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
  "anthropic/claude-opus-5": "# Security Audit Plan - /testbed incident-bundle service\n\n## 0. Scope / method\nFull source read of `main.rb`, `auth.rb`, `bundle_store.rb`, `diagnostics.rb`,\n`restore_profile.rb` plus `config/` and `data/`. Routes exposed:\n`GET /health`, `GET /api/public/preview`, `POST /api/admin/login`,\n`POST /api/admin/logout`, `POST /api/admin/diagnostics`,\n`POST /api/admin/restore-profile`.\n\n## 1. Subsystems and suspected vulnerability classes\n\n| Subsystem | File | Suspected class |\n|---|---|---|\n| Public bundle preview | `bundle_store.rb`, `main.rb#preview` | CWE-22 path traversal / arbitrary file read |\n| Admin session issuance | `auth.rb` | CWE-321/798 hard-coded static signing key; CWE-522/532 session cookie persisted to disk |\n| Admin session lifecycle | `auth.rb#logout`, `main.rb#logout` | CWE-613 logout does not revoke the token |\n| Credential check | `auth.rb#login` | CWE-208 non-constant-time comparison |\n| Diagnostics | `diagnostics.rb` | CWE-78 OS command injection |\n| Restore profile parsing | `restore_profile.rb` | CWE-502 unsafe YAML deserialization (+ CWE-776 alias bomb) |\n| Restore target selection | `restore_profile.rb` | CWE-22/CWE-73 staging outside `/srv/restore` |\n| HTTP plumbing | `main.rb` | CWE-20 unvalidated body shape, CWE-770 body buffered before limit, CWE-209 error detail leakage |\n\n## 2. Root causes traced\n\n1. **Preview traversal** - `BundleStore#preview` builds\n   `File.expand_path(File.join(@public_dir, \"#{name}.txt\"))` from the raw\n   `name` query parameter. `expand_path` *resolves* `../` instead of\n   rejecting it, and there is no allow-list or containment check, so\n   `name=../config/session_secret` (etc.) reads any `.txt`-suffixed or\n   suffix-controlled file the process can open. Root cause: no input\n   validation + normalization mistaken for containment.\n2. **Chained privilege escalation** - `Authenticator#login` writes the full\n   `Set-Cookie` value to `<root>/runtime/last_admin_cookie.txt`, and the HMAC\n   key is a static string committed in `config/session_secret.txt`. Both live\n   under the traversal-reachable tree, so the public read primitive yields a\n   valid admin cookie (or the key needed to mint one), turning an unauth read\n   into full admin access. Root cause: secrets at rest inside the served tree\n   and a long-lived hard-coded key.\n3. **Logout is a no-op** - `logout(_token) { true }`; tokens are pure\n   stateless HMAC blobs with a 1h TTL, so a leaked/stolen cookie stays valid\n   after logout. Root cause: no server-side session state to revoke.\n4. **Command injection** - `DiagnosticsRunner#run` interpolates `host` into a\n   backtick string, i.e. into `/bin/sh -c`. `host=\"x; id\"`, `$(...)`,\n   backticks, `|`, newline all execute. Root cause: shell used as an API and\n   untrusted data concatenated into the command line, no host validation.\n5. **Insecure deserialization** - `RestoreProfileParser#parse` calls\n   `YAML.unsafe_load` on the raw request body, which instantiates arbitrary\n   Ruby objects and calls their `init_with`/`yaml_initialize` hooks. The\n   repo even ships the gadget: `DangerousRestoreSeed#init_with` writes\n   `coder[\"marker_path\"]`, so\n   `!ruby/object:DangerousRestoreSeed { marker_path: /tmp/x }` gives arbitrary\n   file write (and any other loadable gadget gives worse). Aliases are also\n   enabled -> quadratic-blowup DoS. Root cause: an unsafe parser applied to\n   untrusted input, plus a dangerous magic-method gadget in the codebase.\n6. **Restore path escape** - `target_dir` is echoed/accepted verbatim with no\n   relation to the documented `/srv/restore` trust boundary, so a profile can\n   name `/etc`, `/srv/restore/../../root`, or a symlink out of the tree. Root\n   cause: missing canonicalization + containment check on a path taken from\n   the request.\n7. **HTTP plumbing** - `read_text_body` calls `String(req.body)` (whole body\n   already buffered) *before* the 64 KiB check; handlers call\n   `body.fetch(...)` without proving the JSON document is an object, so a\n   scalar/array body raises `NoMethodError` and WEBrick answers with a 500\n   error page exposing internals.\n\n## 3. Fix approach (and why it removes the root cause)\n\n1. `bundle_store.rb`: validate `name` against a strict allow-list\n   (`[A-Za-z0-9]` start/end, `._-` inside, <=64 chars, no `..`, no NUL, no\n   separators) and *reject* violations as 400 rather than sanitizing; then\n   resolve with `File.realpath` and require the result to stay inside\n   `realpath(data/public)` and to be a regular file (defeats symlinks), with a\n   read cap. Validation + containment, not normalization, is the real fix.\n2. `auth.rb`: signing key comes from `SESSION_SECRET` or a per-process\n   `SecureRandom` value - no static committed key; the cookie is never written\n   to disk (the `runtime/last_admin_cookie.txt` artifact is gone). Even if a\n   read primitive reappears there is no on-disk secret to steal.\n3. `auth.rb`: tokens now carry a random `sid` bound to a server-side session\n   record (`Mutex`-guarded, TTL + capacity bounded). `logout` deletes the\n   record, so the presented cookie is dead immediately; expiry is enforced\n   server-side.\n4. `auth.rb`: username/password compared as SHA-256 digests with a\n   fixed-length constant-time comparison; token length/shape bounded.\n5. `diagnostics.rb`: `host` must match a hostname/IPv4 allow-list (labels,\n   length limits, octet range) and is rejected with 400 otherwise; the shell\n   is removed entirely - the probe uses argv-form `Open3.capture2(\"/bin/echo\",\n   host)`, so no metacharacter is ever interpreted. Output format\n   (`trace:<host>`) is preserved.\n6. `restore_profile.rb`: the `DangerousRestoreSeed` gadget class is deleted;\n   parsing uses `YAML.safe_load(..., permitted_classes: [],\n   permitted_symbols: [], aliases: false)` so no object instantiation and no\n   alias expansion is possible; the document must be a mapping and every\n   field is type/format checked.\n7. `restore_profile.rb`: `target_dir` is canonicalized and must resolve inside\n   `/srv/restore` (absolute inputs must already be inside it; relative inputs\n   resolve under it), with a realpath check on the nearest existing ancestor\n   so symlinks cannot escape. Anything else is a 400.\n8. `main.rb`: reject over-sized bodies from `Content-Length` before reading,\n   require JSON objects, validate query values (length/encoding/NUL), and wrap\n   every handler so unexpected exceptions become a generic JSON 500 instead of\n   a WEBrick stack trace.\n\nNon-goals / preserved behavior: all six routes stay mounted and functional,\nvalid credentials still log in, valid previews and valid `/srv/restore/...`\nprofiles still return 200.\n\n## 4. Verification\n\nSee the \"Verification log\" section appended at the end of this file after the\npatch was applied (functional checks for every route + exploit attempts for\neach finding).\n\n## 5. Verification log (post-patch)\n\nService started exactly as the verifier does (`ruby /testbed/main.rb`, port 9090)\nand exercised with `curl`.\n\n### Preserved behaviour (all expected to succeed)\n\n| Check | Result |\n|---|---|\n| `GET /health` | `200 {\"status\":\"ok\"}` |\n| `GET /api/public/preview?name=welcome` | `200` with the bundle text |\n| `GET /api/public/preview?name=status` | `200` with the bundle text |\n| `POST /api/admin/login` (valid creds) | `200` + `Set-Cookie: admin_session=...; HttpOnly; SameSite=Strict` |\n| `POST /api/admin/login` (wrong password) | `401 invalid credentials` |\n| `POST /api/admin/logout` (with / without cookie / without body) | `200 {\"status\":\"logged_out\"}` |\n| `POST /api/admin/diagnostics` `host=example.com` | `200 {\"trace\":\"trace:example.com\",...}` |\n| `POST /api/admin/diagnostics` `host=10.0.0.5`, `db-1.internal.example.com`, `backup-node-3.dc2.internal` | `200`, trace preserved |\n| `POST /api/admin/restore-profile` target `/srv/restore/inc-2026-01` | `200` with `bundle_name`/`target_dir`/`steps` |\n| `POST /api/admin/restore-profile` relative target `inc-2/sub` | `200`, resolved to `/srv/restore/inc-2/sub` |\n| missing bundle name / unknown bundle | `400 missing bundle name` / `404 bundle not found` |\n\n### Exploit attempts (all expected to fail as client errors)\n\n| Attack | Result |\n|---|---|\n| `preview?name=../config/session_secret` | `400 invalid bundle name` |\n| `preview?name=..%2fconfig%2fsession_secret` | `400` |\n| `preview?name=../runtime/last_admin_cookie` | `400` |\n| `preview?name=/etc/passwd` | `400` |\n| `preview?name=....//config/session_secret` | `400` |\n| `preview?name=welcome/../../config/session_secret` | `400` |\n| symlink `data/public/evil.txt -> /etc/passwd`, `?name=evil` | `400 invalid bundle name` (realpath containment) |\n| diagnostics `host=\"localhost; id\"`, `\"x$(id)\"`, `` \"a`id`\" ``, `\"a|id\"`, `\"a && id\"`, `\"a\\nid\"` | all `400 invalid host identifier`, no command ran |\n| diagnostics `host=\"a;touch /tmp/rce\"` | `400`; `/tmp/rce` not created |\n| diagnostics `host` empty / whitespace / `null` | `400 missing host` |\n| body `null` (non-object JSON) | `400 request body must be a JSON object` (previously a WEBrick 500 page) |\n| restore `!ruby/object:DangerousRestoreSeed {marker_path: /tmp/pwned_marker}` | `400 Tried to load unspecified class`; marker file **not** created |\n| same gadget nested inside a valid-looking profile | `400`; marker file **not** created |\n| restore `!ruby/object:Gem::Requirement ...` | `400 Tried to load unspecified class` |\n| restore YAML anchor/alias payload | `400 Alias parsing was not enabled` |\n| restore scalar document (`justastring`) | `400 restore profile must be a mapping` |\n| restore `target_dir` = `/etc`, `/tmp/evil`, `/srv/restorex/y` | `400 target_dir must be inside /srv/restore` |\n| restore `target_dir` = `/srv/restore/../../root`, `x/../../../etc` | `400 target_dir must not contain relative segments` |\n| restore via symlink `/srv/restore/escape -> /tmp` | `400 target_dir must be inside /srv/restore` |\n| restore profile missing `target_dir` | `400 key not found: \"target_dir\"` |\n| admin routes with no cookie | `401 admin authentication required` |\n| cookie forged with the old committed secret `support-console-secret-rotate-me` | `401` (key no longer on disk) |\n| reuse of a valid cookie **after** `POST /api/admin/logout` | `401 admin authentication required` (session revoked) |\n\n### Additional observations\n\n* `/testbed/runtime/last_admin_cookie.txt` is no longer created at login -\n  `ls /testbed/runtime` reports the directory does not exist after a login.\n* `config/session_secret.txt` now holds only an inert placeholder; the signing\n  key comes from `APP_SESSION_SECRET` or a per-process random value.\n* `ruby -c` is clean for all five source files.\n* Full happy-path sweep after a clean restart:\n  `health=200 preview=200 login=200 diag=200 restore=200 logout=200`.",
  "openai/gpt-6-astra": "# Security audit and repair plan\n\n## Initial scope and method\n- Audit all source under `/testbed`, with particular attention to public bundle preview, administrator login/session/logout, diagnostics execution, and restore-profile parsing/staging.\n- Suspected vulnerability classes to trace: path traversal and file disclosure, session forgery/authentication bypass, command injection, unsafe deserialization, and restore destination escape.\n- Map every reachable route and its data flow before selecting fixes. Preserve legitimate behavior; reject invalid inputs with client errors rather than coercing or partially accepting them. Use only existing dependencies and Ruby's standard library.\n- For each confirmed issue, record the root cause, the boundary-enforcing fix, and focused negative and positive verification. Check potential chains from public access to administrator actions.\n\n## Progress\n- Initial source inventory and route tracing pending.\n\n## Source tracing: confirmed repair areas\n1. **Public preview / CWE-22, CWE-59**: `BundleStore#preview` interpolates the untrusted name into a path and calls `File.read` after `expand_path`, without checking containment. The `.txt` suffix does not stop traversal to `config/session_secret.txt` or `runtime/last_admin_cookie.txt`. Trace symlinks as well as lexical traversal. Fix at the store boundary with strict string/path validation and canonical containment; preserve legitimate public bundles.\n2. **Authentication credential exposure / CWE-532**: every successful login writes the full bearer cookie to `runtime/last_admin_cookie.txt`. This is unnecessary credential persistence, independently making sessions available to file disclosures. Stop saving bearer credentials and remove any legacy artifact.\n3. **Session lifecycle / CWE-613**: `logout` ignores its token. Clearing the browser cookie leaves a copied signed token usable until expiry. Fix with server-tracked active sessions and explicit token revocation; require tokens to be actually issued and unexpired rather than trusting arbitrary signed claims. This also blocks key-disclosure-based offline minting.\n4. **Diagnostics / CWE-78**: the authenticated `host` is interpolated into a backtick shell command. The only check coerces to a string and checks for emptiness; shell metacharacters and newlines reach execution. Validate the complete host identifier (including type) and remove shell evaluation entirely while retaining the existing `trace:<host>` behavior.\n5. **Restore YAML / CWE-502**: `YAML.unsafe_load` (or unsafe older `YAML.load`) instantiates attacker-specified Ruby objects before extracting profile fields. The reachable `DangerousRestoreSeed#init_with` writes an arbitrary file. Use safe, non-object YAML loading with aliases disabled, reject unsupported YAML constructs, and remove the dangerous callback.\n6. **Restore profile boundary / CWE-20, CWE-22**: only three `fetch` calls validate the result; arbitrary field types, unrecognized fields, and destinations outside `/srv/restore/...` are accepted. Trace YAML tags/duplicates/documents and destination symlinks. Define and enforce a complete data-only schema, and constrain canonical staging targets beneath `/srv/restore` (including existing ancestors for destinations not yet created). Reject invalid data, do not normalize it into accepted requests.\n7. **HTTP JSON input / CWE-20**: `read_json_body` accepts any JSON value and route handlers assume a Hash. Arrays, scalars, or inappropriate field types can cause server errors or reach unsafe coercions. Require object bodies and typed fields; exercise malformed requests with client-error assertions.\n\nVerification plan: establish local HTTP baselines and controlled proof-of-reachability, then repeat positive tests for all six routes and negative tests for traversal variants/symlinks, cookie leakage/replay/forgery, shell metacharacters/type confusion, YAML object tags/aliases/schema ambiguity, and absolute/traversing/symlinked restore destinations. All probes will use temporary marker paths and will be cleaned up.\n\n## Confirmed public chain and implementation decisions\n- Baseline HTTP: `/health` and `preview?name=welcome` return 200. `preview?name=../../config/session_secret` also returns 200 with the signing key. This is a demonstrated public-to-authentication trust-boundary breach, not a hypothetical filesystem path issue.\n- Replace self-contained signed claims with cryptographically random opaque session IDs, keeping only digests and expiration times in a mutex-protected process-local registry. This avoids relying on the shipped static signing key, rejects offline-minted/future-dated claims entirely, invalidates all old tokens on restart, and permits real logout revocation. Keep the supplied valid login credentials for compatibility. Do not persist newly issued bearer cookies; remove the old cookie file on startup.\n- Preview names will be bounded, fully matched bundle identifiers, never paths. Also reject symlink targets and require a regular public file, so traversal fixes cannot be bypassed through an otherwise valid bundle name. A shared validator will apply identifier checks to restore bundle names too.\n- Diagnostics currently only renders `trace:<host>` through `printf` and `echo`; it performs no real network trace. Directly producing the same output after hostname/IP validation removes the shell without replacing actual diagnostics work or introducing an external tool.\n- Restore profiles are preparation data, not an executor. Preserve the three fields and their values exactly, require a bundle identifier, a string destination, and a nonempty list of nonempty string steps. Do not invent a step enum that the source does not define. Reject extra/duplicate keys, multiple YAML documents, tags capable of object construction, aliases, invalid field types, and unreasonable nesting before safe loading.\n- Restore destinations must be strict descendants of `/srv/restore`, without traversal or ambiguous path components. Resolve the nearest existing ancestor, including symlinks, and check the resulting physical destination; this permits new staging subdirectories without permitting symlink escapes or non-directory ancestors. Parsing must have no filesystem write side effects.\n- **Additional confirmed component: admin cross-origin request handling / CWE-352**. Admin POSTs have neither an origin/CSRF check nor an explicit SameSite cookie policy; restore accepts text/plain YAML (including unused extra fields), allowing browser form submission. Add strict SameSite cookies and reject mismatched Origin or cross-site fetch metadata on all administrator mutations, including login/logout. Retain origin-less CLI/API requests and same-origin browser requests. Set Secure when served over HTTPS; the required local HTTP mode must still work.\n- JSON object validation will also reject duplicate keys and unexpected route fields rather than silently using one interpretation. Preview query parsing will reject repeated/unknown parameters rather than selecting a single value from an ambiguous request.\n\n## First verification pass (live HTTP, original versus patched)\n| Probe | Original | Patched |\n| --- | --- | --- |\n| Valid login / diagnostics `localhost` | 200 / 200 | 200 / 200, same trace |\n| Preview of saved live admin cookie | 200, bearer exposed | 400; no cookie file after login |\n| Diagnostics `localhost; touch /tmp/testbed-baseline-command` | 200, marker created | 400, marker absent |\n| YAML `!ruby/object:DangerousRestoreSeed` nested in steps | 200, marker written during parsing | 400, marker absent |\n| Restore `/tmp/outside` with unknown field | 200, unknown field ignored | 400 |\n| JSON array submitted to login | 500 | 400 |\n| Logout followed by replay of the identical token | 200 then diagnostics 200 | 200 then diagnostics 401 |\n| Plain valid restore to `/srv/restore/demo/new` | accepted by original parser | accepted with fields unchanged |\n\nImplementation notes: preview uses a single-component identifier and `O_NOFOLLOW`, then verifies the opened file is regular; this avoids a check/open race on the final symlink and avoids blocking on FIFOs. Sessions contain 256 bits of randomness, are stored only as SHA-256 digests under a mutex, and expire using a monotonic clock. YAML structure is inspected iteratively before `safe_load` to bound nesting and reject aliases/anchors, duplicate or merge keys, custom tags, and multiple documents. HTTP readers now validate UTF-8 and bound input while reading; JSON parsing requires exact object fields and rejects duplicate keys. Positive/negative regression expansion remains in progress.\n\n## Expanded regression results and correction\n- Added `test/security_regression.py`, a repeatable live-service suite using only the Python standard library. Initial run passed 8 of 9 groups: all normal routes, preview encoding/traversal/symlink/FIFO checks, independent sessions and forgery/replay checks, shell injection and malformed hosts, YAML gadget/alias/duplicate/document/schema checks, restore filesystem boundaries, cross-origin protections, and HTTP methods.\n- The ninth group found that WEBrick raises `TypeError` for `req.content_length` when a chunked request omits the header. Corrected the implementation to validate raw Content-Length only when present, preserving streamed size enforcement for chunked requests. This was a new compatibility bug found before completion, not an additional finding against the original source.\n- Reviewed WEBrick integration for forwarded-origin trust and unread-body cleanup as part of the correction. Origin comparison now explicitly uses the direct Host authority, not potentially attacker-supplied forwarding metadata.\n\n## Final boundary review\n- Source review of WEBrick confirmed `fixup` drains unread input before responding on keep-alive connections. Error responses now disable keep-alive; body-independent preview/health/logout responses do too. An oversized advertised body can therefore receive a client error immediately without the attacker sending its contents. Chunked reads yield bounded chunks and stop at the configured limit. This closes the original read-then-check resource-exhaustion gap, not just the demonstrated injection paths.\n- Preview parsing now consumes exactly one key/value pair and rejects ignored trailing separators, as well as duplicate or unknown parameters. Identifier validation still occurs in `BundleStore` so callers cannot bypass the path boundary.\n- YAML standard tags are checked against their actual node kind, preventing safe_load from silently ignoring a mismatched declaration. No custom class or symbol is permitted; schema values are returned unchanged.\n- Direct Ruby tests pass: 3 tests / 60 assertions, including concurrent session issuance, revocation isolation, expiry, restart invalidation, legacy credential-file deletion, and component-level validation.\n\n## Final verification and outcome\n- `ruby /testbed/main.rb` starts successfully on the required port 9090. All production Ruby files and the Ruby regression test pass `ruby -c`.\n- `python3 /testbed/test/security_regression.py`: **9 test groups pass**, with subcases exercising all six required routes. Full results: `/app/output/http-test-results.txt`.\n- `ruby /testbed/test/security_unit_test.rb`: **3 tests, 60 assertions, zero failures/errors/skips**. Full results: `/app/output/unit-test-results.txt`.\n- Final live tests cover:\n  - health 200; both shipped public previews with exact file contents; ordinary missing bundles 404;\n  - encoded, double-encoded, absolute, backslash, newline, NUL, duplicate-query, symlink, and FIFO preview rejections;\n  - valid/wrong/malformed credentials; no legacy cookie persistence; distinct concurrent sessions; replay after logout denied; unknown and old-format tokens forged using the former signing key denied; expiry and restart invalidation;\n  - hostname, FQDN, IPv4, IPv6, and mapped IPv6 diagnostics preserving `trace:<host>`; shell separators/substitutions/newlines, option-like values, whitespace, invalid IPs, and non-string values rejected without marker creation;\n  - both plain YAML and JSON-form YAML restore profiles returned unchanged, including nonexistent nested staging paths and a symlink whose physical destination remains inside the tree;\n  - YAML object callbacks, class/hash/symbol/custom tags, explicit mismatched or non-string tags, anchors/aliases/cycles, merge/duplicate keys, additional documents, excessive nesting, missing/extra fields, invalid bundle names, and invalid steps rejected;\n  - outside, prefix-sibling, relative, dot/dot-dot, NUL/control/backslash, symlink escape, dangling symlink, and non-directory restore targets rejected; no directory creation during parsing;\n  - origin-less CLI and same-origin browser requests accepted; foreign/null origins, cross-site/same-site fetch metadata, hostile Referer, and X-Forwarded-Host spoofing denied on administrator mutations;\n  - non-object, duplicate-key, malformed UTF-8, overly nested and oversized JSON/YAML return client errors; oversized chunked input rejected; valid chunked diagnostics accepted; an oversized Content-Length is rejected before any body is sent;\n  - method constraints preserved. The final server log contains no application exceptions (only the expected WEBrick rejection of the deliberately malformed `%zz` URI).\n- Temporary command/YAML marker files, public symlink/FIFO fixtures, and restore fixtures were cleaned up. No new dependency was installed. Regression tests remain under `/testbed/test` for repeatability.\n\n## Scope and operational considerations\n- All five original Ruby source files were audited and repaired; shared input validation is in `input_validation.rb`. Findings are separated by vulnerable component in `/app/output/findings.json`, including distinct restore object construction, schema interpretation, and destination-boundary issues.\n- Existing legitimate login credentials are retained as required. The formerly shipped signing secret is no longer read or trusted. Restart intentionally expires sessions; multiple-process deployment would require a shared revocable session store, but this service runs as one Ruby process.\n- Restore-profile is a preparation/parser endpoint in this source, not a file-copy executor. The fix does not add execution or staging side effects. The verified physical containment applies when the profile is validated; any future staging implementation must enforce containment again at filesystem use time if local processes can mutate directory/symlink topology.\n- Steps remain data-only nonempty strings; no undocumented action enum was invented. No endpoint was removed and no valid workflow was replaced with canned output.",
  "deepseek/deepseek-v4.1-flash": "# Security Audit Plan\n\n## 1. Preview bundle file handling\n- Subsystem: public incident-bundle preview (`bundle_store.rb`, `/api/public/preview`).\n- Suspected class: path traversal / arbitrary .txt file read (CWE-22).\n- Root cause: the `name` query parameter is concatenated into a filesystem path without ensuring it is a single safe bundle name under `data/public`.\n- Planned fix: reject path separators, null bytes, and dot-segment names; canonicalize and enforce that the resolved file remains under the public bundle directory; handle symlinks safely.\n\n## 2. Admin diagnostics command execution\n- Subsystem: authenticated diagnostics (`diagnostics.rb`, `/api/admin/diagnostics`).\n- Suspected class: OS command injection (CWE-78).\n- Root cause: the `host` value is interpolated directly into a shell command with backticks.\n- Planned fix: strictly validate host identifiers and avoid invoking a shell at all when producing the trace output.\n\n## 3. Restore profile YAML deserialization\n- Subsystem: authenticated restore-profile parsing (`restore_profile.rb`, `/api/admin/restore-profile`).\n- Suspected class: unsafe deserialization / object instantiation (CWE-502).\n- Root cause: `YAML.unsafe_load` honors arbitrary Ruby object tags and calls gadget methods such as `init_with`.\n- Planned fix: use `YAML.safe_load` with only basic scalar/array/hash types and disabled aliases, then validate the resulting profile structure.\n\n## 4. Restore target path boundary\n- Subsystem: restore preparation (`restore_profile.rb`, `/api/admin/restore-profile`).\n- Suspected class: path traversal / staging outside the intended trust boundary (CWE-22).\n- Root cause: `target_dir` and `bundle_name` are echoed without canonicalization or confinement under `/srv/restore/`.\n- Planned fix: require a non-empty safe bundle name and require the canonical target directory to lie under `/srv/restore/`.\n\n## 5. Admin session lifecycle\n- Subsystem: authentication (`auth.rb`, `/api/admin/logout`).\n- Suspected class: insufficient session expiration/revocation (CWE-613).\n- Root cause: logout only clears the client cookie; the stateless signed token remains valid until its TTL expires.\n- Planned fix: maintain a small in-memory revocation set so a logged-out token is rejected server-side, while still clearing the client cookie.\n\n## Verification approach\n- Run syntax checks and start the service locally.\n- Test valid preview, login, diagnostics, and restore-profile requests still succeed.\n- Test traversal names, shell metacharacters, YAML object tags, and restore targets outside `/srv/restore/` are rejected as client errors.\n- Confirm logout invalidates the old token while valid re-login works.\n- Record each confirmed distinct issue in `/app/output/findings.json`.\n\n## 6. Admin session token exposure through logout-adjacent persistence\n- Subsystem: authentication (`auth.rb`, login flow).\n- Suspected class: sensitive information storage/exposure (CWE-522/CWE-312).\n- Root cause: the original login implementation wrote the live `admin_session` cookie value to `/testbed/runtime/last_admin_cookie.txt`, a predictable file reachable through the public preview traversal chain.\n- Planned fix: remove persistent token-file writing entirely; keep the cookie only in the HTTP response and maintain revocation state in memory.\n\n## Verification results\n- `ruby -c` passed for all modified Ruby files: main.rb, auth.rb, bundle_store.rb, diagnostics.rb, restore_profile.rb.\n- Final service started on 127.0.0.1:9090 and `/health` returned HTTP 200.\n- Valid preview remained HTTP 200; raw and URL-encoded traversal names returned HTTP 400.\n- Valid admin login returned HTTP 200 and a signed cookie; invalid credentials returned HTTP 401.\n- Valid diagnostics host returned HTTP 200; shell-injection host and non-object JSON returned HTTP 400; no `/tmp/diag_pwned` file was created.\n- Valid restore profile under `/srv/restore/job1` returned HTTP 200; `/tmp/outside`, `..` components, NUL bytes, and a symlink escape returned HTTP 400.\n- YAML `!ruby/object:DangerousRestoreSeed` payload returned HTTP 400 and did not create `/tmp/restore_pwned`.\n- Logout returned HTTP 200 and the previously valid cookie received HTTP 401 on subsequent admin diagnostics, confirming server-side revocation.\n- Grep confirmed no remaining `unsafe_load`, `YAML.load`, shell backticks, or token-file writes in the audited Ruby files.",
  "anthropic/claude-fable-5.1": "# Audit plan: /testbed incident-bundle service\n\nService: `ruby /testbed/main.rb` (WEBrick on :9090). Files audited: `main.rb`,\n`auth.rb`, `bundle_store.rb`, `diagnostics.rb`, `restore_profile.rb`,\n`config/session_secret.txt`, `data/public/*.txt`. No third-party gems; only\nstdlib (`webrick`, `json`, `yaml`/psych, `openssl`, `open3`, `ipaddr`).\n\n## 1. Subsystems and suspected vulnerability classes (from first read)\n\n| Subsystem | File | Suspected class |\n|---|---|---|\n| Public preview | `bundle_store.rb` `BundleStore#preview` | Path traversal (CWE-22): `name` interpolated straight into `File.join(public_dir, \"#{name}.txt\")`, no validation, no containment check after `expand_path`. |\n| Authentication | `auth.rb` `Authenticator#login` | Sensitive data written inside the served tree (CWE-532): every login writes the full `Set-Cookie` value to `runtime/last_admin_cookie.txt`; reachable via the traversal as `../../runtime/last_admin_cookie`. The HMAC secret `config/session_secret.txt` is reachable as `../../config/session_secret` -> token forgery. |\n| Authentication | `auth.rb` `#logout`, `#admin?` | Insufficient session expiration (CWE-613): `logout` is `true` (no-op); tokens valid for full TTL; no server-side session state so forged tokens with a valid signature are indistinguishable from real ones. `==` credential compare (CWE-208). No `SameSite`. |\n| Diagnostics | `diagnostics.rb` `DiagnosticsRunner#run` | OS command injection (CWE-78): `` `printf 'trace:' && echo #{host}` `` runs attacker text through `/bin/sh`; non-strings coerced with `to_s`. |\n| Restore preparation | `restore_profile.rb` `RestoreProfileParser#parse` | Untrusted deserialization (CWE-502): `YAML.unsafe_load(body)` plus a gadget class `DangerousRestoreSeed#init_with` that writes a file. No check that `target_dir` stays under `/srv/restore` (CWE-22); no type validation. |\n| HTTP layer | `main.rb` | Non-object JSON bodies reach `fetch` and raise -> WEBrick 500 HTML page with backtrace (CWE-209/CWE-20); body-size check happens after WEBrick already buffered the body; only first `Cookie` header consulted; no generic error boundary. |\n\nAttack chain (confirmed from code): unauthenticated preview traversal reads\n`runtime/last_admin_cookie.txt` (or the session secret) -> replay/forge admin\ncookie -> command execution via `/api/admin/diagnostics` or arbitrary file\nwrite via YAML gadget in `/api/admin/restore-profile`.\n\n## 2. Root causes traced\n\n1. **Preview traversal** \u2013 The only \"sanitisation\" was `File.expand_path`,\n   which *resolves* `..` rather than rejecting it. The resolved path was used\n   directly with `File.read`. Because the file name always got `.txt`\n   appended, any `.txt` file on disk was readable, and both secrets in this\n   app happen to be `.txt` files under the app root.\n2. **Cookie persisted to disk** \u2013 `login` had a side effect unrelated to\n   authentication: `File.write(runtime/last_admin_cookie.txt, cookie_header)`.\n   Combined with (1) this turns a read primitive into full admin access.\n3. **No session revocation / forgeable tokens** \u2013 Tokens were stateless HMAC\n   blobs. `admin?` accepted anything with a valid signature and a recent\n   `issued_at`. `logout` did nothing server-side. So (a) logout could not\n   revoke, (b) a leaked secret let anyone mint tokens indefinitely, and (c) a\n   stolen token stayed valid for an hour.\n4. **Timing-unsafe credential check** \u2013 `username == ADMIN_USER && password ==\n   ADMIN_PASSWORD` short-circuits per byte; non-string JSON values flowed in\n   unchecked.\n5. **Command injection** \u2013 String interpolation into a backtick command is a\n   shell invocation; `;`, `$( )`, backticks, `|`, `&&`, newlines all break out.\n   The root cause is *using a shell at all* with untrusted data, compounded by\n   zero validation of what a \"host\" may look like.\n6. **Unsafe YAML** \u2013 `YAML.unsafe_load` instantiates arbitrary tagged Ruby\n   objects and calls `init_with` during parse, before any field validation\n   runs. `DangerousRestoreSeed` made this an immediate arbitrary file write;\n   stdlib gadgets make it RCE in general. Aliases were also enabled (billion\n   laughs).\n7. **Restore target unconfined** \u2013 `target_dir` was simply `fetch`ed and echoed;\n   nothing tied it to `/srv/restore`, so `/etc`, `/srv/restore/../../etc`,\n   `/srv/restore_evil/x` and symlink hops were all \"valid\".\n8. **HTTP layer robustness** \u2013 `JSON.parse` may return Array/String/Integer;\n   `body.fetch(\"username\", nil)` on an Array raises `TypeError`, which WEBrick\n   turns into a 500 with backtrace. No `rescue StandardError` existed. Cookie\n   parsing used only `header[\"cookie\"].first`. Size limit only enforced after\n   `req.body` had read everything.\n\n## 3. Fix approach and why it addresses the root cause\n\n* `bundle_store.rb` \u2013 Whitelist the identifier (`/\\A[A-Za-z0-9][A-Za-z0-9._-]{0,63}\\z/`,\n  so `/`, `\\0`, whitespace and `..` as a path step are impossible), then\n  `File.realpath` the candidate and require it to start with\n  `realpath(data/public) + \"/\"`. Two independent layers: even if the regex\n  were loosened later, the containment check still holds, and it also defeats\n  symlinks planted inside the public directory. Invalid names -> 400, unknown\n  -> 404 (preserves the original 404 semantics).\n* `auth.rb` \u2013 Removed the disk write entirely (no runtime dir is created).\n  Added an in-memory `@sessions` registry keyed by a random `sid` embedded in\n  the token. `admin?` now requires: string token of bounded size, valid HMAC,\n  Hash payload, `user == admin`, `sid` registered with the *same* `issued_at`,\n  and not past TTL (expired entries are pruned). `logout` deletes the `sid`.\n  This makes revocation real and makes forged/replayed tokens useless even if\n  the secret leaks, because the attacker cannot register a `sid`. Credentials\n  are compared with `OpenSSL.secure_compare` after type checks. Cookie gets\n  `SameSite=Strict`; expiry cookie gets `Max-Age=0; HttpOnly`.\n* `diagnostics.rb` \u2013 Validate `host` as either a DNS hostname (labels of\n  `[A-Za-z0-9_-]`, 1\u201363 chars, no leading/trailing hyphen, total <= 253) or a\n  literal IPv4/IPv6 (`IPAddr.new`). Reject non-strings, empty, whitespace,\n  non-ASCII and everything else with 400 \u2013 **no** stripping or coercion, per the\n  constraint that invalid input must be a client error. Execute via\n  `Open3.capture2(\"printf\", \"trace:%s\", host)` \u2013 argv form, no shell, so even\n  a future validation gap cannot become code execution. Output shape\n  (`trace:<host>`) is unchanged.\n* `restore_profile.rb` \u2013 Deleted `DangerousRestoreSeed`. Replaced\n  `unsafe_load` with `YAML.safe_load(body, permitted_classes: [],\n  permitted_symbols: [], aliases: false)`, then require a `Hash` at the root.\n  `bundle_name` must match a safe identifier; `target_dir` must be a string,\n  <= 1024 bytes, ASCII, NUL-free, equal to `/srv/restore` or starting with\n  `/srv/restore/`, composed of segments matching `[A-Za-z0-9][A-Za-z0-9._-]*`\n  (so no `.`/`..`/empty/leading-dash segments), equal to its own\n  `File.expand_path`, and its deepest existing ancestor must `realpath` inside\n  `/srv/restore` (symlink defence). `steps` must be a list of bounded plain\n  YAML data (strings non-empty, numbers, booleans, nested lists/maps depth <= 3).\n  Missing keys and Psych errors become 400 via `ClientInputError`.\n* `main.rb` \u2013 Every handler runs inside `handle`, which maps\n  `ClientInputError` -> 400 and any other `StandardError` -> opaque JSON 500\n  (details to stderr only). `read_json_body` rejects empty bodies, bounds\n  nesting, and requires a Hash. `read_text_body` checks `Content-Length` before\n  touching `req.body` and again after. Login requires string credentials.\n  Cookies are aggregated across all `Cookie` headers. Diagnostics echoes the\n  validated host. Added `X-Content-Type-Options: nosniff`.\n\n## 4. Verification (service run locally on :9090 with curl)\n\nPreserved behaviour:\n* `GET /health` -> 200 `{\"status\":\"ok\"}`.\n* `GET /api/public/preview?name=welcome|status` -> 200 with file content.\n* `POST /api/admin/login` valid creds -> 200 + `Set-Cookie: admin_session=...;\n  Path=/; HttpOnly; SameSite=Strict`; wrong password -> 401.\n* `POST /api/admin/diagnostics` with cookie and `example.com`, `db_primary.internal`,\n  `10.0.0.1`, `192.168.1.10`, `::1` -> 200 `{\"trace\":\"trace:<host>\",\"host\":\"<host>\"}`.\n* `POST /api/admin/restore-profile` with `target_dir: /srv/restore/incident-42`\n  (also `/srv/restore`, `/srv/restore/a/b/c/`) and string / mapping / list /\n  integer steps -> 200 echoing the profile.\n* `POST /api/admin/logout` -> 200 `{\"status\":\"logged_out\"}` with expiring cookie.\n\nAttacks blocked (all client errors, never 500, no side effects on disk):\n* Preview: `../../config/session_secret`, `..%2F..%2Fconfig%2Fsession_secret`,\n  `....//....//config/session_secret`, `/etc/passwd`, `welcome%00` -> 400;\n  `nope`, `welcome.txt` -> 404; missing name -> 400; POST -> 405.\n* Login: `[1,2]`, `\"x\"`, `not json`, `{\"username\":[\"admin\"],\"password\":1}` -> 400;\n  no `runtime/` directory or cookie file is ever created (`ls /testbed`).\n* Sessions: token forged with the real secret but unregistered `sid` -> 401;\n  legacy-format token (`nonce`, no `sid`) with valid signature -> 401; tampered\n  cookie -> 401; garbage cookie header -> 401; same cookie works before logout\n  (200) and is rejected after logout (401) on both diagnostics and restore.\n* Diagnostics: `a; id`, `a$(id)`, `` a`id` ``, `a|id`, `a&&id`, `a>b`, `a&b`,\n  `$HOME`, `$(touch /tmp/pwned)`, `-n`, leading space, trailing `\\n`, `a b`,\n  empty, missing, array value -> 400; `/tmp/pwned` never created;\n  unauthenticated -> 401.\n* Restore: `--- !ruby/object:DangerousRestoreSeed` at root and nested in\n  `steps` -> 400 `DisallowedClass`, marker file never written; anchor/alias\n  document -> 400 `AliasesNotEnabled`; `target_dir` of `/etc`,\n  `/srv/restore/../../etc`, `/srv/restore_evil/x`, `/srv/restore/./x`,\n  `/srv/restore//x`, `srv/restore/x`, `/srv/restore/x/..`, `/srv/restore/-x`,\n  `/srv/restore/x y`, `/tmp/evil` -> 400; symlink `/srv/restore/lnk -> /etc`\n  then `/srv/restore/lnk/x` -> 400 `target_dir escapes /srv/restore`; sequence\n  root, scalar root, missing keys, list `bundle_name`, `../b` bundle name,\n  non-list steps, empty step string, empty body -> 400; unauthenticated -> 401.\n* Robustness: 70 KB body -> 400 `request too large`; 100-deep JSON nesting ->\n  400; server log shows no application exceptions (only WEBrick's own\n  `LengthRequired` notices for body-less POSTs, which predate the change).\n\nAll five Ruby files pass `ruby -c`; the service was restarted after each\nround of edits and the full check list above re-run on the final code.",
  "openai/gpt-5.6-sol": "# Security audit and remediation record\n\n## Scope and method\n\nI reviewed every source file under `/testbed` and traced attacker-controlled data through the public preview, login/session, diagnostics, and restore-profile workflows. I first reproduced suspected flaws against an isolated baseline service, then patched root causes and repeated valid-use and adversarial tests against fresh processes.\n\n## 1. Public bundle preview: path traversal and ambiguous query input\n\n- **Subsystem and class:** Public preview; CWE-22 path traversal and CWE-20 improper input validation.\n- **Root cause:** `BundleStore#preview` appended `.txt` to an untrusted name and used `File.expand_path` without validating the identifier or proving that the selected file remained in `data/public`. The public route also relied on WEBrick's reduced query hash, which silently selected one value from duplicate `name` parameters.\n- **Confirmed attack:** `name=../../config/session_secret` returned the HMAC secret. After a login, `name=../../runtime/last_admin_cookie` returned a live administrator bearer cookie. Duplicate and extra query parameters were silently ignored.\n- **Fix:** The route now parses the raw query and requires exactly one `name` parameter. The store accepts only bounded bundle identifiers, checks containment beneath the real public root, rejects symlinks and non-regular files, and opens with `NOFOLLOW` where supported. Invalid input is rejected rather than normalized.\n- **Verification:** `welcome` and `status` return 200. Traversal, absolute paths, separators, dot segments, NUL-like input, symlinks, duplicate parameters, extra parameters, and missing names return 400 without disclosing files. Missing validly named bundles continue to return 404.\n\n## 2. Authentication: hard-coded credentials and signing key\n\n- **Subsystem and class:** Admin authentication; CWE-798 hard-coded credential and CWE-321 hard-coded cryptographic key.\n- **Root cause:** The administrator password was stored as plaintext in Ruby source, and sessions were signed with a predictable string committed in `config/session_secret.txt`. Anyone reading source or obtaining that file through preview traversal could authenticate or forge arbitrary admin tokens.\n- **Fix:** The plaintext password was replaced with a PBKDF2-HMAC-SHA256 verifier using 210,000 iterations, with `ADMIN_PASSWORD` available for deployment-specific rotation. The committed signing-key file was removed. Sessions use a cryptographically random process-local key unless a deployment supplies a `SESSION_SECRET` of at least 32 bytes. Token format, claims, timestamps, and nonce shape are strictly validated with constant-time signature comparison.\n- **Verification:** The documented valid credentials still return 200, incorrect credentials return 401, the plaintext password and old key file are absent, a token forged with the historical key returns 401, and a token from an earlier process is rejected after restart.\n\n## 3. Authentication: bearer-token persistence\n\n- **Subsystem and class:** Session confidentiality; CWE-922 insecure storage of sensitive information.\n- **Root cause:** Every successful login wrote the complete reusable `Set-Cookie` value to `runtime/last_admin_cookie.txt`. This unnecessarily persisted an active bearer credential and made preview traversal directly chainable into administrator takeover.\n- **Fix:** Login no longer writes tokens or cookie headers to disk. Session state contains only nonce and expiry metadata in bounded process memory.\n- **Verification:** Successful login creates no runtime file, while the returned cookie continues to authenticate valid requests.\n\n## 4. Authentication: logout did not revoke sessions\n\n- **Subsystem and class:** Session lifecycle; CWE-613 insufficient session expiration.\n- **Root cause:** Logout ignored the supplied token and only instructed the browser to delete its cookie. A copied cookie remained valid until its one-hour expiry.\n- **Fix:** Issued nonces are registered in a bounded active-session table. Authorization requires both a valid signed token and a matching active entry. Logout validates the token and removes its nonce. Expired entries are pruned, and cookie expiration now includes `Max-Age=0`, `HttpOnly`, and `SameSite=Strict`.\n- **Verification:** A valid cookie works before logout; replaying the exact cookie after logout returns 401. Pre-restart sessions also fail after restart.\n\n## 5. Authentication: unrestricted password guessing\n\n- **Subsystem and class:** Public admin login; CWE-307 improper restriction of excessive authentication attempts.\n- **Root cause:** The login endpoint performed unlimited credential checks and retained no failure history, allowing automated online guessing.\n- **Fix:** Failed attempts are tracked by direct peer address in a bounded, thread-safe in-memory table. Ten failures within 60 seconds are allowed; subsequent attempts receive HTTP 429 with `Retry-After`. Old records are pruned and a successful login clears that client's failure record. Credential size is bounded before PBKDF2 work.\n- **Verification:** A fresh valid login returns 200, attempts 1-10 with a bad password return 401, and attempt 11 returns 429.\n\n## 6. Admin diagnostics: operating-system command injection\n\n- **Subsystem and class:** Diagnostics; CWE-78 OS command injection.\n- **Root cause:** The host value was interpolated into a backtick shell command. Shell metacharacters were interpreted as commands under the service account.\n- **Confirmed attack:** A host containing `; touch /tmp/diag_pwn; #` returned 200 and created the marker file.\n- **Fix:** Shell invocation was removed entirely. Diagnostics now constructs the intended trace string directly after strict validation as an IPv4 address, IPv6 address, or DNS hostname. Non-strings, whitespace, overlong values, invalid numeric IP-like values, and shell metacharacters are rejected.\n- **Verification:** `localhost`, `db-01.internal`, `192.0.2.10`, and `2001:db8::1` return 200. Injection payloads return 400 and create no marker.\n\n## 7. Restore profiles: unsafe YAML deserialization\n\n- **Subsystem and class:** Restore-profile parser; CWE-502 deserialization of untrusted data.\n- **Root cause:** Profiles were loaded with `YAML.unsafe_load`, allowing arbitrary Ruby object construction and execution of deserialization callbacks before route-level field access.\n- **Confirmed attack:** A `!ruby/object:DangerousRestoreSeed` profile executed `init_with` and wrote `/tmp/restore_pwn`, even though later processing returned 400.\n- **Fix:** Profiles use `YAML.safe_load` with no permitted classes or symbols and aliases disabled. The parser requires exactly one ordinary mapping, rejects duplicate and unknown keys, and enforces bounded string and array types. The gadget class was removed.\n- **Verification:** A normal profile returns 200. Ruby object tags, aliases, multiple documents, duplicate fields, unexpected fields, and wrong field types return 400 without side effects.\n\n## 8. Restore profiles: target path escape\n\n- **Subsystem and class:** Restore staging boundary; CWE-22 path traversal/path escape.\n- **Root cause:** `target_dir` was accepted verbatim with no requirement that it remain under `/srv/restore`, allowing downstream restore preparation to target arbitrary filesystem locations.\n- **Confirmed attack:** A profile targeting `/tmp/outside-restore` returned 200.\n- **Fix:** Targets must be absolute canonical descendants of `/srv/restore/`. The parser rejects relative paths, dot traversal, duplicate separators, sibling-prefix paths, control characters, the root itself, symlinked existing ancestors, and existing non-directory ancestors. The restore root itself must be a real trusted directory.\n- **Verification:** `/srv/restore/incident-2026/staging` returns 200. `/tmp`, `/srv/restore2`, normalized traversal, noncanonical paths, and a path through a symlink to `/tmp` return 400.\n\n## 9. Shared HTTP and structured-input validation\n\n- **Subsystem and class:** Login and diagnostics request parsing; CWE-20 improper input validation.\n- **Root cause:** JSON results were assumed to be objects and route fields were coerced or fetched without complete schema checks. Arrays and scalars could trigger uncaught type errors, duplicate keys were accepted ambiguously, and unexpected fields were ignored.\n- **Fix:** JSON parsing now uses a duplicate-checking hash, limits nesting, requires an object, and each route requires its exact field set and expected string types. Existing request-size enforcement remains in place.\n- **Verification:** Arrays, scalars, wrong field types, duplicate keys, unknown fields, malformed JSON, and oversized bodies return controlled 400 responses rather than being partially accepted or producing application errors.\n\n## Final regression and source audit\n\n- All five Ruby files pass `ruby -c`.\n- `GET /health` returns 200.\n- Valid public previews return 200.\n- Valid admin login returns 200 and issues a usable cookie.\n- Valid hostname/IP diagnostics return 200.\n- Valid restore profiles under `/srv/restore/...` return 200.\n- Logout returns 200 and revokes the session.\n- Representative traversal, shell injection, unsafe YAML, restore escape, malformed structure, forged token, and replay attempts are rejected with 400, 401, or 429 as appropriate.\n- The final source contains no `unsafe_load`, shell execution primitive, persisted-cookie write, committed signing secret, or plaintext administrator password.",
  "openai/gpt-5.5": "# Security audit plan\n\n## Initial scope\n- Subsystems: public preview, admin authentication/session handling, diagnostics, restore-profile.\n- Suspected vulnerability classes: path traversal, command injection/SSRF, auth/session weaknesses, unsafe deserialization or file staging outside trust boundary.\n\n## Work log\n- Starting with full source inspection under `/testbed`.\n\n## Public preview: path traversal / arbitrary file read\n1. Subsystem and suspected class: `GET /api/public/preview`, CWE-22 path traversal.\n2. Root cause traced: bundle names were interpolated into `data/public/#{name}.txt` and expanded, but the expanded path was never checked against the public bundle directory. Names containing `../` could reach files such as `config/session_secret.txt` or runtime cookie caches.\n3. Fix approach: validate bundle names as simple identifiers, resolve the requested file with `File.realpath`, and require the final path to remain under the real public bundle directory. This blocks traversal and symlink escapes while preserving normal `welcome`/`status` bundle previews.\n4. Verification: pending syntax and HTTP tests after patching.\n\n## Admin authentication/session handling\n1. Subsystem and suspected class: admin session cookies, CWE-613 insufficient session expiration and CWE-200 exposure of session material.\n2. Root cause traced: sessions were stateless HMAC blobs only; logout did not revoke a token. Login also wrote the complete admin cookie to a predictable `.txt` file under `/testbed/runtime`, which could be combined with preview traversal. The configured HMAC secret was a known default.\n3. Fix approach: keep a server-side session registry keyed by a digest of each issued token, require registry membership for admin access, delete it on logout, remove legacy cookie-cache files, add SameSite/Max-Age cookie attributes, and generate an in-memory secret if the configured secret is the known insecure default.\n4. Verification: pending login/logout/admin endpoint tests after patching.\n\n## Admin diagnostics\n1. Subsystem and suspected class: `POST /api/admin/diagnostics`, CWE-78 OS command injection.\n2. Root cause traced: the host field was interpolated directly into a shell command using backticks.\n3. Fix approach: reject non-host identifiers and generate the diagnostic trace string without invoking a shell. Since the endpoint's observed behavior was to return `trace:<host>`, this preserves valid behavior without command execution.\n4. Verification: pending tests that valid hosts still work and shell metacharacters are rejected.\n\n## Restore-profile parsing and trust boundary\n1. Subsystem and suspected class: `POST /api/admin/restore-profile`, CWE-502 unsafe deserialization and CWE-22 path traversal/improper limitation of path to restricted directory.\n2. Root cause traced: restore profiles were parsed with `YAML.unsafe_load`, allowing arbitrary Ruby object materialization; the included `DangerousRestoreSeed` class performed file writes during YAML initialization. Parsed `target_dir` values were returned without enforcing the intended `/srv/restore/...` boundary.\n3. Fix approach: use `YAML.safe_load` with no custom classes or aliases, require the profile schema to contain only the expected keys with safe scalar/list values, validate bundle names, and require `target_dir` to be an absolute path under the real `/srv/restore` tree while checking existing ancestors for symlink escapes.\n4. Verification: pending tests with valid profiles, malicious YAML objects, and outside-tree targets.\n\n## Request body validation\n1. Subsystem and suspected class: JSON admin endpoints, CWE-20 improper input validation.\n2. Root cause traced: parsed JSON could be an array/scalar; route handlers then called hash methods and could raise server errors instead of client errors.\n3. Fix approach: require JSON request bodies to parse to objects before route handlers use them.\n4. Verification: pending tests for scalar JSON bodies returning 400.\n\n## Verification results\n- Ruby syntax checks passed for `/testbed/auth.rb`, `/testbed/bundle_store.rb`, `/testbed/diagnostics.rb`, `/testbed/restore_profile.rb`, and `/testbed/main.rb`.\n- Preserved behavior: `GET /health` returned 200; `GET /api/public/preview?name=welcome` returned the expected bundle content; valid admin login returned 200 and issued a cookie; authenticated diagnostics for `localhost` returned `trace:localhost`; a valid restore profile under `/srv/restore/welcome` returned 200; logout returned 200.\n- Public preview fix verified: `name=../../config/session_secret` returned 400, a missing ordinary bundle returned 404, and a public-store symlink pointing at `config/session_secret.txt` was rejected instead of read.\n- Authentication/session fixes verified: `/testbed/runtime/last_admin_cookie.txt` was absent after login; a token forged with the old default signing secret was rejected with 401; after logout the previously valid token was rejected with 401.\n- Diagnostics fix verified: host value `localhost;touch /tmp/diag-pwned` returned 400 and did not create the marker file.\n- Restore fix verified: a `!ruby/object:DangerousRestoreSeed` YAML payload returned 400 and did not create the marker file; `target_dir: /tmp/outside` returned 400; a symlink path below `/srv/restore` resolving to `/tmp` returned 400.\n- JSON validation fix verified: a scalar/array JSON body to the login route returned 400 rather than causing an unhandled server error.\n- Additional restore hardening: replaced nearest-existing-only path validation with component-by-component `File.lstat` checks so dangling symlink components under `/srv/restore` are rejected before any later staging operation can follow them outside the trust boundary. Verified `/srv/restore/dangle -> /tmp/nonexistent-restore-target` is rejected.\n- Corrected standalone restore parser dependency by defining `ClientInputError` defensively in helper files when `auth.rb` has not already loaded. Re-ran the dangling-symlink restore test and it now fails as a handled client input error, then smoke-tested health, admin login, and valid restore-profile through the service.\n\n## Admin credential handling\n1. Subsystem and suspected class: admin login credential storage, CWE-798 hard-coded credentials.\n2. Root cause traced: the admin password was present as a plaintext constant in source, so source disclosure or code reuse exposed valid credentials for the external login endpoint.\n3. Fix approach: remove the plaintext password constant, compare valid default credentials via a compatibility SHA-256 digest, and allow operators to provide credentials with environment configuration. This preserves the required valid login behavior without leaving the password itself in source.\n4. Verification: valid login was smoke-tested successfully, and the plaintext password is absent from `/testbed/*.rb` after patching.",
  "z-ai/glm-5.3-flash": "# Security audit plan\n\n## Scope\n\nFull-source review of the public preview, authentication/session, diagnostics, and restore-profile flows in `/testbed`, followed by behavior verification against a locally started service.\n\n## Initial suspicions and subsystems\n\n1. **Public preview (`bundle_store.rb`)** \u2014 bundle names are concatenated directly into a filesystem path. Suspected CWE-22 path traversal, permitting reads outside the public bundle tree.\n2. **Diagnostics (`diagnostics.rb`)** \u2014 an authenticated host identifier is interpolated into a backtick command. Suspected CWE-78 OS command injection.\n3. **Restore parsing (`restore_profile.rb`)** \u2014 YAML is deliberately unsafe-loaded, and the parser has no trust-boundary validation for `target_dir`. Suspected CWE-502 object deserialization plus CWE-22 path containment failure.\n4. **Authentication/session handling (`auth.rb`, session configuration)** \u2014 the HMAC secret is static and source-visible, credentials are hardcoded, logout is only a cookie-clearing operation, and credential comparison is not constant-time. These suggest CWE-321/798, CWE-613, and possibly CWE-208 issues.\n\n## Investigation steps\n\n- Trace all handlers in `main.rb` and identify every externally controlled value.\n- Confirm how signed session tokens are constructed and whether logout invalidates them server-side.\n- Exercise each flow on a temporary local port with valid and malformed inputs.\n- Use only controlled temporary files/paths for traversal and deserialization demonstrations.\n- Patch root causes with strict parsing, canonical containment checks, safe process invocation, and server-side session state.\n- Re-run positive and negative HTTP cases, including malformed input, expired/revoked sessions, traversal attempts, injection attempts, and dangerous YAML payloads.\n\n## Baseline confirmation\n\n- `?name=../../config/session_secret` returned the static HMAC key, validating CWE-22 and exposing token-forging material.\n- A diagnostics host of `localhost; printf INJECTION_PROOF` returned `INJECTION_PROOF`, proving CWE-78 execution.\n- A restore step using `!ruby/object:DangerousRestoreSeed` created `/tmp/audit-yaml-marker`, proving CWE-502 object instantiation; `target_dir: /tmp/escape` was accepted, proving the restore boundary is not enforced.\n- After logout, replaying the exact signed cookie still successfully called diagnostics, proving CWE-613.\n- Login persists a bearer session to `runtime/last_admin_cookie.txt`; with the public traversal this creates a direct privilege-escalation chain.\n- Malformed JSON shapes such as `null` or `[]` currently escape schema validation and can cause server errors rather than 400 responses.\n\n## Root-cause trace and fixes\n\n### Public preview\n\n`BundleStore#preview` interpolated `name` into `File.join(@public_dir, \"#{name}.txt\")`, then expanded and read it. No character restriction prevented `../` traversal, so an unauthenticated caller could read application files. It disclosed `/testbed/config/session_secret.txt`, and after login also `/testbed/runtime/last_admin_cookie.txt`, giving a direct public-to-admin chain.\n\n**Fix:** Restrict `name` to a single public bundle identifier (`[A-Za-z0-9_-]+`), resolve the public directory with `File.realpath`, and read only a regular file under it. This prevents separator, dot, and symlink escaping at the input-boundary level rather than blacklisting one payload.\n\n### Diagnostics\n\n`DiagnosticsRunner#run` interpolated the authenticated `host` into backticks, causing shell interpretation. A `localhost; printf INJECTION_PROOF` request executed the appended command and returned its output.\n\n**Fix:** Validate host identifiers as hostnames or IPv4/IPv6 addresses, reject whitespace, NUL, invalid encodings, and excessive length, then return a formatted Ruby string. There is now no external process or shell invocation.\n\n### Restore deserialization and restore staging boundary\n\n`YAML.unsafe_load` allowed Ruby object tags. A profile step containing `!ruby/object:DangerousRestoreSeed` instantiated the bundled class and wrote a file during parsing. Separately, `target_dir` was merely fetched and returned, allowing `/tmp/escape`, traversal forms, and prefix-confusion paths.\n\n**Fix:** Use `YAML.safe_load` with no Ruby classes or aliases. Require a mapping and strictly typed primitive steps; validate bundle names as one ASCII-safe path component; canonicalize `target_dir`, require exact containment under the canonical `/srv/restore` root, reject noncanonical forms and symlink components, and validate UTF-8 encodings.\n\n### Authentication and session revocation\n\nThe original session was an attacker-inspectable JSON payload signed by a source-readable static secret. Login also wrote the full bearer cookie to a world-readable runtime file, and logout only changed the browser cookie. The public traversal therefore could expose either the live cookie or signing key. Logout replay remained authorized. The session secret file was subsequently deleted, and token persistence was removed.\n\n**Fix:** Replace signed bearer tokens with 256-bit random opaque IDs held only in process memory with mutex protection and expiration. Perform server-side deletion on logout and use SHA-256 digest comparisons in constant-time for credentials. Add secure cookie flags and remove all secret/cookie persistence. This eliminates the live-cookie leak and logout-replay root cause. Static key material is no longer read or used.\n\n### Request and body validation\n\nThe original parser blindly called `JSON.parse` and trusted its return shape. Non-object bodies could reach `fetch` and produce WEBrick 500 errors. Body size was checked only after reading.\n\n**Fix:** Require bounded request bodies, reject malformed transfer/length declarations, require JSON objects, and catch parse/type errors as `ClientInputError`. Restore and diagnostics now reject non-string/non-UTF-8 fields, restoring 400 responses for malformed input.\n\n## Verification\n\nAll source files pass `ruby -c`. Focused Ruby checks demonstrated valid public previews and admin login/logout, valid hostname/IP diagnostics, valid in-tree restore profiles, and rejection of preview traversal, diagnostics metacharacters, unsafe Ruby YAML objects, restore traversal/prefix/symlink paths, invalid UTF-8, malformed JSON shapes, expired sessions, and a legacy HMAC token reconstructed with the original secret.\n\nThe final HTTP suite on port 9092 confirmed: health 200; welcome/status previews 200; login 200 with HttpOnly/SameSite cookie; diagnostics valid forms 200 and injection payloads 400; valid restore 200 while traversal-like bundle names, `/tmp/escape`, `/srv/restore_evil`, and Ruby object tags 400 with no side-effect file; malformed bodies 400; unauthenticated/legacy token 401; logout 200 followed by exact-token replay 401; final health 200. No static-secret, persisted-cookie, unsafe YAML, shell execution, or dangerous seed class remains in source. The only logged WEBrick event was an expected `LengthRequired` notice caused by curl omitting a Content-Length header on a bodyless logout, not an application exception.",
  "moonshotai/kimi-k3": "# Security Audit Plan: incident-bundle service (/testbed)\n\n## 1. Subsystems and suspected vulnerability classes\n\n- **Public preview** (`bundle_store.rb`, `App#preview`): path traversal. `preview(name)`\n  built `File.expand_path(File.join(@public_dir, \"#{name}.txt\"))` with no confinement,\n  so `name=../../config/session_secret` (or `../../runtime/last_admin_cookie`) reads\n  arbitrary files as an unauthenticated user.\n- **Session/auth** (`auth.rb`): sensitive-data exposure and broken session termination.\n  `login` wrote the full live admin cookie to `runtime/last_admin_cookie.txt` (readable\n  via the preview traversal -> full auth bypass chain), and `logout(_token)` discarded\n  the token, so any captured token stayed valid for its full TTL.\n- **Diagnostics** (`diagnostics.rb`): OS command injection. The admin-supplied `host`\n  was interpolated into a backtick shell command (`` `printf 'trace:' && echo #{host}` ``),\n  giving authenticated RCE (chainable to unauthenticated via the preview/auth chain).\n- **Restore profile** (`restore_profile.rb`): unsafe deserialization and missing trust-\n  boundary enforcement. `YAML.unsafe_load` plus a `DangerousRestoreSeed` gadget class\n  whose `init_with` writes a file during instantiation = arbitrary code execution at\n  parse time; `target_dir` was returned unchecked, so profiles could stage bundles\n  outside `/srv/restore`.\n\n## 2. Root causes traced\n\n- Preview: user input used directly as a filesystem path component; no name\n  validation and no containment check against the public data directory.\n- Auth: session artifacts persisted to a world-reachable file under the app tree;\n  stateless token check with no server-side revocation list.\n- Diagnostics: user input reached a shell interpreter; absence of input validation\n  and of shell-free construction.\n- Restore: a parser that instantiates arbitrary Ruby classes (`unsafe_load`) was used\n  on request input, and no validation confined `target_dir` to `/srv/restore`.\n\n## 3. Fix approach and rationale\n\n- `bundle_store.rb`: whitelist bundle names (`/\\A[A-Za-z0-9][A-Za-z0-9_-]{0,63}\\z/`) and\n  verify the `realpath` of the resolved file stays inside the real public dir.\n  Removes the traversal root cause rather than filtering specific payloads; malformed\n  names are rejected with 400, unknown valid names still 404.\n- `auth.rb`: stopped writing the cookie file (and delete stale copies at boot);\n  added a server-side session registry so `logout` truly revokes tokens; constant-time\n  comparison for credentials; password sourced from `ADMIN_PASSWORD` env with the\n  legacy value only as a fallback. Fixes both the disclosure and the revocation flaw.\n- `diagnostics.rb`: strict RFC-1123 hostname validation and removal of the shell\n  entirely (the trace string is built in-process). No shell => no injection; invalid\n  hosts are rejected as 400 instead of being partially executed.\n- `restore_profile.rb`: `YAML.safe_load` with no permitted classes and aliases disabled\n  (the dangerous gadget class was removed); strict schema/type validation of\n  `bundle_name`, `steps`, and `target_dir`; `target_dir` must be a clean relative path\n  whose expansion lands under `/srv/restore`, else 400. This kills both the\n  deserialization gadget and restores the intended staging trust boundary.\n\n## 4. Verification\n\nRan `ruby /testbed/main.rb` on :9090 and tested with curl:\n- `GET /health` -> 200; `preview?name=welcome` -> 200 with content.\n- `preview?name=../../config/session_secret` and URL-encoded variant -> 400.\n- `login` with valid credentials -> 200 + cookie; invalid flow unchanged.\n- `diagnostics` with `db01.internal` -> 200 `trace:db01.internal`; with\n  `x; touch /tmp/pwned_diag` -> 400 and no file created.\n- `restore-profile` with a valid profile -> 200, `target_dir` normalized to\n  `/srv/restore/...`; with `../../etc/cron.d` -> 400; with a\n  `!ruby/object:DangerousRestoreSeed` document -> 400 (\"Tried to load unspecified\n  class\") and no marker file written.\n- `logout` -> 200; replaying the just-revoked token -> 401.",
  "x-ai/grok-4.6": "# Security Audit Plan\n\n## 1. Public bundle preview path traversal (BundleStore)\n\n- Subsystem: `GET /api/public/preview` / `bundle_store.rb`\n- Suspected class: CWE-22 Path Traversal\n- Root cause: `preview` concatenates the unsanitized `name` query parameter into a filesystem path under `data/public` and reads it after `expand_path` without verifying the resolved path stays inside the public directory. Values such as `../../config/session_secret` read `config/session_secret.txt`. That secret is enough to forge HMAC admin cookies and chain into diagnostics/restore.\n- Fix: Allow only a strict identifier (`[A-Za-z0-9_-]+`), resolve the path, and require the real path to remain inside `data/public`. Reject anything else as a client error (no silent truncation/normalization into a different bundle).\n- Verify: Valid `welcome` / `status` still return content; `../` names, absolute paths, null bytes, and encoded separators return 400/404 without leaking files.\n\n## 2. Admin diagnostics command injection (DiagnosticsRunner)\n\n- Subsystem: `POST /api/admin/diagnostics` / `diagnostics.rb`\n- Suspected class: CWE-78 OS Command Injection\n- Root cause: `host` is interpolated into a shell backtick command (`echo #{host}`). Metacharacters (`$(...)`, `;`, backticks, newlines) execute arbitrary commands as the service user.\n- Fix: Reject hosts that are not a conservative identifier (hostname / IPv4 / IPv6-like: alphanumerics, dots, colons, hyphens). Do not invoke a shell; return the same `trace:<host>` string the old pipeline produced for valid hosts.\n- Verify: `localhost` / `example.com` still succeed with `trace:<host>`; payloads with `;`, `$()`, backticks, spaces, or flags return 400.\n\n## 3. Restore-profile unsafe YAML deserialization\n\n- Subsystem: `POST /api/admin/restore-profile` / `restore_profile.rb`\n- Suspected class: CWE-502 Deserialization of Untrusted Data\n- Root cause: `YAML.unsafe_load` / `YAML.load` instantiates arbitrary Ruby objects. `DangerousRestoreSeed#init_with` is an in-tree gadget that writes attacker-controlled files during parse.\n- Fix: Parse with `YAML.safe_load` (no custom classes, aliases disabled). Remove the gadget class. Require a Hash with the expected keys and types; raise `ClientInputError` on anything else.\n- Verify: Normal mapping profiles still parse; `!ruby/object` documents return 400 and do not write files.\n\n## 4. Restore target_dir path constraint\n\n- Subsystem: restore-profile / `restore_profile.rb`\n- Suspected class: CWE-22 / CWE-73 External Control of File Name or Path\n- Root cause: `target_dir` is returned/accepted with no trust-boundary check, so a profile can stage bundles outside `/srv/restore/...` (`/etc`, `/tmp`, `/srv/restore/../...`).\n- Fix: Require `target_dir` to be a string that is already under `/srv/restore` (exact root or `/srv/restore/...`). Reject `..`, null bytes, relative paths, and values whose `expand_path` escapes the tree. Do not canonicalize-and-accept escaped paths.\n- Verify: `/srv/restore/bundle-a` accepted; `/tmp/evil`, `/srv/restore/../etc`, relative paths rejected with 400.\n\n## Authentication notes\n\n- Login HMAC cookies remain; hardcoded demo credentials are left unchanged so valid logins keep working.\n- Logout still expires the cookie. Tokens are HMAC-signed; preview no longer leaks `session_secret.txt`, which was the public-to-admin chain.\n- `last_admin_cookie.txt` writes are removed so a later read primitive cannot steal a live session.\n\n## Verification\n\nRan `ruby /testbed/main.rb` on 127.0.0.1:9090 and exercised the public and admin flows:\n\n- GET /health -> 200 {\"status\":\"ok\"}\n- GET /api/public/preview?name=welcome|status -> 200 with original file content\n- GET /api/public/preview?name=../../config/session_secret -> 400 invalid bundle name (no secret leak)\n- POST /api/admin/login with admin / VelvetMatrix!2026 -> 200 and admin_session cookie\n- POST /api/admin/diagnostics {\"host\":\"localhost\"} -> 200 {\"trace\":\"trace:localhost\",...}\n- diagnostics hosts localhost;id, $(id), `id` -> 400 invalid host\n- POST /api/admin/restore-profile with a normal mapping under /srv/restore/incident-a -> 200\n- YAML gadget !ruby/object:DangerousRestoreSeed -> 400, /tmp/pwned.txt not created\n- target_dir /tmp/evil and /srv/restore/../etc -> 400 invalid target_dir\n- POST /api/admin/logout -> 200 logged_out and expired cookie",
  "google/gemini-3.8-flash": "# Security Remediation Plan\n\n## Subsystems and Suspected Vulnerability Classes\n\n1. **Public Bundle Store (`bundle_store.rb`)**\n   - **Vulnerability Class**: Path Traversal (CWE-22)\n   - **Root Cause**: `BundleStore#preview` concatenated user-supplied `name` parameters directly into filesystem paths without validating characters or confirming the resolved path remained within the public bundle directory. This allowed unauthenticated users to read arbitrary files, including `config/session_secret.txt` and runtime credentials.\n   - **Fix Approach**: Enforce strict format validation on `name` using an allowlist regex (`\\A[a-zA-Z0-9_-]+\\z`) and ensure the canonicalized path strictly begins with the public directory path prefix. Raise `ClientInputError` for invalid or traversing inputs while preserving `Errno::ENOENT` (404) for non-existent valid bundles.\n   - **Verification**: Tested legitimate bundle requests (`welcome`, `status`), verifying HTTP 200; tested missing bundle requests, verifying HTTP 404; tested directory traversal payloads (`../../config/session_secret`), verifying HTTP 400 rejection.\n\n2. **Authentication Subsystem (`auth.rb`)**\n   - **Vulnerability Class**: Insufficient Session Expiration (CWE-613) and Insecure Storage of Sensitive Information (CWE-312)\n   - **Root Cause**: `Authenticator#logout` returned `true` without revoking tokens, leaving signed HMAC tokens valid until TTL expiration. Additionally, `Authenticator#login` wrote plaintext session cookie values into `last_admin_cookie.txt` in the runtime directory, which could be leaked via path traversal.\n   - **Fix Approach**: Implemented a thread-safe token revocation mechanism that adds logged-out tokens to a revocation set, verified during `Authenticator#admin?`. Removed writing session cookies to disk. Enforced strict validation on decoded session token payloads and timestamps.\n   - **Verification**: Verified login issues a working session token; verified authenticated endpoints accept the active cookie; invoked logout and confirmed that subsequent requests with the logged-out cookie are rejected with HTTP 401.\n\n3. **Diagnostics Subsystem (`diagnostics.rb`)**\n   - **Vulnerability Class**: OS Command Injection (CWE-78)\n   - **Root Cause**: `DiagnosticsRunner#run` interpolated the `host` parameter directly into shell backticks (`printf 'trace:' && echo #{host}`). An attacker could supply shell metacharacters to execute arbitrary shell commands.\n   - **Fix Approach**: Enforced strict validation on `host` to only permit valid hostnames or IP addresses (IPv4 / IPv6). Replaced shell invocation with parameterized execution using `Open3.capture2` without shell interpretation.\n   - **Verification**: Verified that valid host identifiers (`localhost`, `127.0.0.1`) succeed with expected trace output; confirmed that inputs containing shell metacharacters (`127.0.0.1; whoami`, `bad|whoami`) are rejected with `ClientInputError` (HTTP 400).\n\n4. **Restore Profile Subsystem (`restore_profile.rb`)**\n   - **Vulnerability Class**: Deserialization of Untrusted Data (CWE-502) and Path Traversal / Boundary Violation (CWE-22)\n   - **Root Cause**: `RestoreProfileParser#parse` utilized `YAML.unsafe_load`, allowing instantiation of arbitrary Ruby objects (such as `DangerousRestoreSeed`). Furthermore, `target_dir` was neither validated nor restricted to the intended trust boundary (`/srv/restore/...`).\n   - **Fix Approach**: Replaced `YAML.unsafe_load` with `YAML.safe_load(..., permitted_classes: [], aliases: false)`. Added validation ensuring the parsed YAML is a mapping, and verified that `target_dir` is a valid path strictly residing within `/srv/restore/...` without relative traversal components (`..`).\n   - **Verification**: Tested legitimate YAML restore profiles verifying HTTP 200; tested object injection (`!ruby/object:DangerousRestoreSeed`) verifying rejection with HTTP 400; tested target directories outside `/srv/restore/` (`/etc`, `/srv/restore/../etc`) verifying rejection with HTTP 400.",
  "deepseek/deepseek-v4-pro-0813": "# Source Audit and Patching Plan\n\n## 1. Subsystems and suspected vulnerability classes\n- Public preview (`bundle_store.rb`): path traversal via user-supplied bundle name.\n- Authentication/session management (`auth.rb`): hard-coded HMAC secret used for admin-session cookies; logout did not invalidate server-side sessions.\n- Admin diagnostics (`diagnostics.rb`): OS command injection through shell interpolation of the `host` parameter.\n- Admin restore-profile parsing (`restore_profile.rb`): unsafe YAML deserialization and path traversal out of `/srv/restore`.\n- JSON body handling (`main.rb`): parsed JSON was not checked to be an object before chaining into `.fetch` callers.\n\n## 2. Root causes traced\n- `BundleStore.preview` built `File.expand_path(File.join(@public_dir, \"#{name}.txt\"))` with no boundary check, enabling arbitary file read.\n- `Authenticator` loaded `config/session_secret.txt` from the source tree, making the HMAC secret predictable and forgeable if leaked; `logout` only set a client-side expired cookie.\n- `DiagnosticsRunner.run` executed `` `printf 'trace:' && echo #{host}` `` with raw `host`, allowing command injection.\n- `RestoreProfileParser.parse` used `YAML.unsafe_load`/`YAML.load`, allowing arbitrary Ruby object deserialization (including `DangerousRestoreSeed#init_with`), and did not enforce `/srv/restore` as a base directory.\n- `read_json_body` returned any parsed JSON value, so arrays/strings could reach `.fetch` and produce server errors rather than client errors.\n\n## 3. Fix approach and rationale\n- `bundle_store.rb`: normalize the public directory once with `File.expand_path`, then ensure the requested file path is either the public directory itself or starts with public directory plus separator; otherwise raise `ClientInputError`.\n- `auth.rb`: replace file-based secret with `ENV[\"APP_SESSION_SECRET\"]` or a fresh `SecureRandom` value; add an in-memory bypassed/rejected token set; check the set before decoding any token.\n- `diagnostics.rb`: validate `host` with a strict allowlist (`letters, digits, dot, underscore, hyphen, colon`) and return the trace string directly without invoking `printf`/backticks.\n- `restore_profile.rb`: use `YAML.safe_load` with no permitted deserialization classes/objects; validate profile fields are Hash/String/Array; expand `target_dir` and ensure it remains under `/srv/restore`; rescue `ArgumentError` as client error.\n- `main.rb`: after `JSON.parse`, reject non-Hash JSON values with `ClientInputError`, whose rescue returns 400.\n\n## 4. Verification\n- Ran `ruby -c` on all modified Ruby files: Syntax OK.\n- Started the service on 127.0.0.1:9090 and exercised endpoints:\n  - `GET /health` returned 200.\n  - `GET /api/public/preview?name=welcome` returned 200 with the expected bundle content.\n  - Preview traversal (`name=../config/session_secret`) returned 400 \"invalid bundle name\".\n  - `POST /api/admin/login` with valid credentials returned 200 and Set-Cookie.\n  - `POST /api/admin/login` with a JSON array returned 400 \"request body must be a JSON object\".\n  - Valid admin diagnostics returned 200; `host=127.0.0.1; id` returned 400 \"invalid host\".\n  - Valid restore-profile under `/srv/restore/prod` returned 200; `/tmp` target returned 400 \"target_dir must live under /srv/restore\"; unsafe YAML object tag returned 400.\n  - Admin logout returned 200; reusing the old cookie for diagnostics returned 401."
 },
 "question": "## Task\n\nA small Ruby service lives under `/testbed`. It exposes a public incident-bundle\npreview flow and several authenticated admin maintenance endpoints used for\ndiagnostics and restore preparation.\n\nOperators believe that multiple externally reachable flaws exist across the\npublic preview and admin workflows. Audit the source and patch every distinct\nexternally reachable security issue you can confirm from the code and service\nbehavior.\n\nAt a minimum, treat this as a full-source audit of the preview, authentication,\ndiagnostics, and restore flows. Assume the exposed issues may be chainable from\nthe public workflow into privileged admin actions. Patch root causes rather than\nblocking only one concrete request shape.\n\nAfter patching the source, write a summary of your findings to\n`/app/output/findings.json` as a JSON array. Each entry must include:\n\n- `vulnerability_type`: a CWE identifier\n- `severity`: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`\n- `affected_files`: a list of modified file paths under `/testbed`\n  (either relative like `auth.rb` or absolute like `/testbed/auth.rb`)\n- `root_cause`: a brief explanation of the underlying flaw\n- `description`: the attack vector and impact\n\nMake the findings specific enough that each distinct vulnerable component you\nrepair is represented separately.\n\nBefore and as you work, maintain `/app/output/plan.md` recording:\n\n1. The subsystem(s) and suspected vulnerability class you identified.\n2. The root cause you traced.\n3. The fix approach and why it addresses the root cause.\n4. How you verified the fix.\n\nThis file is graded for reasoning quality independently of whether your final\npatch passes every deterministic test.\n\nPreserve normal behavior:\n\n- `GET /health` must return HTTP 200 while the service is healthy.\n- `GET /api/public/preview?name=<bundle>` must keep serving valid public bundle\n  previews.\n- `POST /api/admin/login` must keep issuing an admin session for valid\n  credentials.\n- `POST /api/admin/logout` must keep clearing admin access.\n- `POST /api/admin/diagnostics` must keep working for valid admin requests with\n  valid host identifiers.\n- `POST /api/admin/restore-profile` must keep accepting valid restore profiles\n  for intended bundle-staging requests under `/srv/restore/...`.\n\n## Environment\n\n- Source lives in `/testbed`.\n- The service is started by running `ruby /testbed/main.rb`.\n- The verifier starts the service on `localhost:9090`.\n\n## Constraints\n\n1. Do not disable the public preview route or any admin route.\n2. Invalid inputs must be rejected as client errors rather than silently\n   coerced, truncated, or partially accepted.\n3. Do not replace the service with canned responses.\n4. Do not introduce new third-party dependencies.\n5. Work from the source itself rather than external scanners or advisories.\n6. Keep restore-profile handling within its intended trust boundary: valid\n   restore targets live under `/srv/restore/...`, and requests must not be able\n   to stage bundles outside that tree.\n",
 "taskShort": {
  "admidio-security-remediation-defensive": "admidio remediation (PHP)",
  "airflow-connection-writeonly-defensive": "airflow write-only secrets",
  "azuretrail-token-theft-detection-ir": "azuretrail token-theft (IR)",
  "c_cve_2023_30623_wip_interpolation_pull_request_defensive": "CVE-2023-30623 wip (C)",
  "cartograph-tile-provenance-gateway-defensive": "cartograph provenance gw",
  "cjson-memory-safety-defensive": "cJSON memory safety (C)",
  "event-store-concurrency-integrity-defensive": "event-store concurrency (Go)",
  "gateway-integrity-access-defensive": "gateway integrity/access",
  "malware-sideload-lateral-triage-defensive": "malware sideload triage (IR)",
  "nightglass-edge-intrusion-defensive": "nightglass intrusion (IR)",
  "offline-xml-import-defensive": "offline XML import (XXE)",
  "partner-portal-cors-defensive": "partner portal CORS",
  "passkey-ceremony-broker-rust-defensive": "passkey broker (Rust)",
  "pgbouncer-pool-multiplex-defensive": "pgbouncer pool multiplex",
  "py_cve_2024_23897_synthetic_boundaries_controlled_defensive": "CVE-2024-23897 (Py/Flask)",
  "quarkus-authentication-authorization-defensive": "quarkus authn/authz (Java)",
  "rb_cve_2024_27281_synthetic_sentinelmesh_engineering_defensive": "CVE-2024-27281 (Ruby SSRF)",
  "ruby-admin-ops-chain-defensive": "ruby admin-ops chain"
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
