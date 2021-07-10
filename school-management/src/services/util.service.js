export const commonValidationRules = {
  noRules: [],
  requiredRules: [
    v => !!v || "This field is required"
  ],
  emailIdRules: [
    v => !!v || "E-mail is required",
    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
  ],
  minSelectOneOption: [
    (v) => !!v || 'This field is required',
    (v) => (v && v.length >= 1) || 'Select at least one option'
  ],
}