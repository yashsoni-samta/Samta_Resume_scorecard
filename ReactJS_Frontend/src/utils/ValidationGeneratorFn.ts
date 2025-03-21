import * as yup from 'yup';

export interface ValidationRule {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  validations?: {
    required?: {
      message: string;
    };
    minLength?: {
      message: string;
      value: number;
    };
    maxLength?: {
      message: string;
      value: number;
    };
    pattern?: {
      match: RegExp;
      message: string;
    };
    min?: {
      message: string;
      value: number;
    };
    max?: {
      message: string;
      value: number;
    };
    isTrue?: {
      message: string;
    };
    isFalse?: {
      message: string;
    };
    minItems?: {
      value: number;
      message: string;
    };
    maxItems?: {
      value: number;
      message: string;
    };
    shape?: ValidationRule[]; // For object type, nested schema
    sameAs?: {
      field: string; // Field name to compare with
      message: string;
    };
  };
}

// Function to dynamically build a Yup validation schema
const createYupSchema = (
  schemaFromBackend: ValidationRule[]
): yup.ObjectSchema<any> => {
  const validationSchema: Record<string, yup.Schema<any>> = {};

  schemaFromBackend.forEach((field) => {
    let validator: yup.Schema<any>;

    switch (field.type) {
      case 'string': {
        validator = yup.string();
        if (field.validations?.minLength) {
          validator = (validator as yup.StringSchema).min(
            field.validations.minLength.value,
            field.validations.minLength.message.replace(
              '{{minLength}}',
              String(field.validations.minLength.value)
            )
          );
        }
        if (field.validations?.maxLength) {
          validator = (validator as yup.StringSchema).max(
            field.validations.maxLength.value,
            field.validations.maxLength.message.replace(
              '{{maxLength}}',
              String(field.validations.maxLength.value)
            )
          );
        }
        if (field.validations?.pattern) {
          validator = (validator as yup.StringSchema).matches(
            field.validations.pattern.match,
            field.validations.pattern.message
          );
        }
        break;
      }

      case 'number': {
        validator = yup.number();
        if (field.validations?.min) {
          validator = (validator as yup.NumberSchema).min(
            field.validations.min.value,
            field.validations.min.message.replace(
              '{{min}}',
              String(field.validations.min.value)
            )
          );
        }
        if (field.validations?.max) {
          validator = (validator as yup.NumberSchema).max(
            field.validations.max.value,
            field.validations.max.message.replace(
              '{{max}}',
              String(field.validations.max.value)
            )
          );
        }
        break;
      }

      case 'boolean': {
        validator = yup.boolean();
        if (field.validations?.isTrue) {
          validator = validator.oneOf([true], field.validations.isTrue.message);
        }
        if (field.validations?.isFalse) {
          validator = validator.oneOf(
            [false],
            field.validations.isFalse.message
          );
        }
        break;
      }

      case 'array':
        validator = yup.array().of(yup.mixed()); // Specify the array type as mixed
        if (field.validations?.minItems) {
          validator = yup
            .array()
            .of(yup.mixed())
            .min(
              field.validations.minItems.value,
              field.validations.minItems.message.replace(
                '{{minItems}}',
                String(field.validations.minItems.value)
              )
            );
        }
        if (field.validations?.maxItems) {
          validator = yup
            .array()
            .of(yup.mixed())
            .max(
              field.validations.maxItems.value,
              field.validations.maxItems.message.replace(
                '{{maxItems}}',
                String(field.validations.maxItems.value)
              )
            );
        }
        break;

      case 'object': {
        const shape = field.validations?.shape
          ? createYupSchema(field.validations.shape)
          : {};
        validator = yup.object().shape(shape);
        break;
      }

      default: {
        validator = yup.mixed(); // Handle unsupported or mixed cases
        break;
      }
    }

    // Apply the required validation if specified
    if (field.validations?.required) {
      validator = validator.required(field.validations.required.message);
    }

    // Handle custom validation like confirm password
    if (field.validations?.sameAs) {
      validator = validator.oneOf(
        [yup.ref(field.validations.sameAs.field)],
        field.validations.sameAs.message
      );
    }

    // Assign the validator to the field name
    validationSchema[field.name] = validator;
  });

  // Return the fully built validation schema
  return yup.object().shape(validationSchema);
};

export default createYupSchema;
