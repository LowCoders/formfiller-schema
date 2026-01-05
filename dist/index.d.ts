import * as interfaces from './interfaces/index.js';
export * from './interfaces/index.js';
export { SchemaVersionManager, getVersionManager, SchemaMigration, SchemaValidator, ValidationLevel, ValidationOptions as SchemaValidationOptions, ValidationResult, ValidationError, ValidationWarning, SchemaDefaults, withDefaults, withDeepDefaults, DeprecationManager, getDeprecationManager, DeprecatedField, DeprecationWarning, SchemaCache, getSchemaCache, createSchemaCache, CacheStats, PerformanceMonitor, getPerformanceMonitor, createPerformanceMonitor, PerformanceMetrics, MeasurementResult, } from './core/index.js';
export { v1ToV2Migration, MigrationRegistry, getMigrationRegistry } from './migrations/index.js';
/**
 * Validates a field configuration against the schema
 * @param fieldConfig Field configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateField(fieldConfig: interfaces.FieldConfig): {
    valid: boolean;
    errors: any[];
};
/**
 * Validates an item configuration against the schema
 * @param itemConfig Item configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateItem(itemConfig: interfaces.ItemConfig): {
    valid: boolean;
    errors: any[];
};
/**
 * Validates a view configuration against the schema
 * @deprecated Use validateItem instead - ViewConfig is now ItemConfig
 * @param viewConfig View configuration to validate
 * @returns Validation result with errors if any
 */
export declare function validateView(viewConfig: interfaces.ItemConfig): {
    valid: boolean;
    errors: any[];
};
export declare const schemas: {
    completeSchema: {
        $schema: string;
        title: string;
        description: string;
        definitions: {
            ValidationRule: {
                type: string;
                description: string;
                oneOf: ({
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf: {
                        required: string[];
                    }[];
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        pattern: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        comparisonTarget: {
                            type: string;
                            description: string;
                        };
                        comparisonType: {
                            enum: string[];
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        validationCallback: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        apiEndpoint: {
                            type: string;
                            description: string;
                        };
                        apiMethod: {
                            enum: string[];
                            description: string;
                        };
                        apiPayload: {
                            type: string;
                            description: string;
                        };
                        apiTimeout: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        subtype: {
                            enum: string[];
                            description: string;
                        };
                        correctAnswer: {
                            description: string;
                        };
                        points: {
                            type: string;
                            description: string;
                        };
                        penalty: {
                            type: string;
                            description: string;
                        };
                        partialCredit: {
                            type: string;
                            description: string;
                        };
                        keywords: {
                            type: string;
                            properties: {
                                required: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                optional: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                            };
                            description: string;
                        };
                        minLength: {
                            type: string;
                            description: string;
                        };
                        tolerance: {
                            type: string;
                            description: string;
                        };
                        compute: {
                            type: string;
                            description: string;
                        };
                        returnToFrontend: {
                            type: string;
                            description: string;
                        };
                        storeResult: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        validFrom: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        validUntil: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        schedule: {
                            type: string;
                            description: string;
                        };
                        timezone: {
                            type: string;
                            description: string;
                        };
                        gracePeriod: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                        };
                        pluginName: {
                            type: string;
                            description: string;
                        };
                        pluginConfig: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        when: {
                            $ref: string;
                            description: string;
                        };
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        and?: undefined;
                        groupMessage?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        and: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            minItems: number;
                            description: string;
                        };
                        groupMessage: {
                            type: string;
                            description: string;
                        };
                        stopOnFirstError: {
                            type: string;
                            description: string;
                        };
                        type?: undefined;
                        message?: undefined;
                        when?: undefined;
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        or: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            minItems: number;
                            description: string;
                        };
                        groupMessage: {
                            type: string;
                            description: string;
                        };
                        stopOnFirstError: {
                            type: string;
                            description: string;
                        };
                        type?: undefined;
                        message?: undefined;
                        when?: undefined;
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                } | {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        not: {
                            $ref: string;
                            description: string;
                        };
                        groupMessage: {
                            type: string;
                            description: string;
                        };
                        type?: undefined;
                        message?: undefined;
                        when?: undefined;
                        min?: undefined;
                        max?: undefined;
                        pattern?: undefined;
                        comparisonTarget?: undefined;
                        comparisonType?: undefined;
                        validationCallback?: undefined;
                        apiEndpoint?: undefined;
                        apiMethod?: undefined;
                        apiPayload?: undefined;
                        apiTimeout?: undefined;
                        subtype?: undefined;
                        correctAnswer?: undefined;
                        points?: undefined;
                        penalty?: undefined;
                        partialCredit?: undefined;
                        keywords?: undefined;
                        minLength?: undefined;
                        tolerance?: undefined;
                        compute?: undefined;
                        returnToFrontend?: undefined;
                        storeResult?: undefined;
                        validFrom?: undefined;
                        validUntil?: undefined;
                        schedule?: undefined;
                        timezone?: undefined;
                        gracePeriod?: undefined;
                        pluginName?: undefined;
                        pluginConfig?: undefined;
                        and?: undefined;
                        stopOnFirstError?: undefined;
                        or?: undefined;
                    };
                    required: string[];
                    anyOf?: undefined;
                })[];
            };
            ConditionalField: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    field: {
                        type: string;
                        description: string;
                    };
                    operator: {
                        enum: string[];
                        description: string;
                    };
                    value: {
                        description: string;
                    };
                };
                required: string[];
            };
            ConditionalExpression: {
                description: string;
                anyOf: ({
                    type: string;
                    description: string;
                    properties: {
                        and: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            minItems: number;
                        };
                        or?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                    patternProperties?: undefined;
                    minProperties?: undefined;
                } | {
                    type: string;
                    description: string;
                    properties: {
                        or: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            minItems: number;
                        };
                        and?: undefined;
                        not?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                    patternProperties?: undefined;
                    minProperties?: undefined;
                } | {
                    type: string;
                    description: string;
                    properties: {
                        not: {
                            $ref: string;
                        };
                        and?: undefined;
                        or?: undefined;
                    };
                    required: string[];
                    additionalProperties: boolean;
                    patternProperties?: undefined;
                    minProperties?: undefined;
                } | {
                    type: string;
                    description: string;
                    patternProperties: {
                        "^(?!and$|or$|not$).*$": {
                            type: string;
                            minItems: number;
                            maxItems: number;
                            items: ({
                                type: string;
                                enum: string[];
                                items?: undefined;
                                minItems?: undefined;
                            } | {
                                type: string;
                                items: {
                                    oneOf: {
                                        type: string;
                                    }[];
                                };
                                minItems: number;
                                enum?: undefined;
                            })[];
                            not?: undefined;
                            oneOf?: undefined;
                        };
                    };
                    additionalProperties: boolean;
                    minProperties: number;
                    properties?: undefined;
                    required?: undefined;
                } | {
                    type: string;
                    description: string;
                    patternProperties: {
                        "^(?!and$|or$|not$).*$": {
                            type: string;
                            minItems: number;
                            maxItems: number;
                            items: ({
                                type: string;
                                enum: string[];
                                oneOf?: undefined;
                            } | {
                                oneOf: {
                                    type: string;
                                }[];
                                type?: undefined;
                                enum?: undefined;
                            })[];
                            not?: undefined;
                            oneOf?: undefined;
                        };
                    };
                    additionalProperties: boolean;
                    minProperties: number;
                    properties?: undefined;
                    required?: undefined;
                } | {
                    type: string;
                    description: string;
                    patternProperties: {
                        "^(?!and$|or$|not$).*$": {
                            type: string;
                            minItems: number;
                            maxItems: number;
                            items: ({
                                type: string;
                                enum: string[];
                            } | {
                                type: string;
                                enum?: undefined;
                            })[];
                            not?: undefined;
                            oneOf?: undefined;
                        };
                    };
                    additionalProperties: boolean;
                    minProperties: number;
                    properties?: undefined;
                    required?: undefined;
                } | {
                    type: string;
                    description: string;
                    patternProperties: {
                        "^(?!and$|or$|not$).*$": {
                            type: string;
                            items: {
                                oneOf: {
                                    type: string;
                                }[];
                            };
                            minItems: number;
                            not: {
                                contains: {
                                    type: string;
                                };
                            };
                            maxItems?: undefined;
                            oneOf?: undefined;
                        };
                    };
                    additionalProperties: boolean;
                    minProperties: number;
                    properties?: undefined;
                    required?: undefined;
                } | {
                    type: string;
                    description: string;
                    patternProperties: {
                        "^(?!and$|or$|not$).*$": {
                            oneOf: {
                                type: string;
                            }[];
                            type?: undefined;
                            minItems?: undefined;
                            maxItems?: undefined;
                            items?: undefined;
                            not?: undefined;
                        };
                    };
                    additionalProperties: boolean;
                    minProperties: number;
                    properties?: undefined;
                    required?: undefined;
                })[];
            };
            LookupConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    dataSource: {
                        type: string;
                        description: string;
                    };
                    displayExpr: {
                        type: string;
                        description: string;
                    };
                    valueExpr: {
                        type: string;
                        description: string;
                    };
                    setCellValue: {
                        type: string;
                        description: string;
                    };
                    dependsOn: {
                        type: string;
                        items: {
                            type: string;
                        };
                        description: string;
                    };
                };
                required: string[];
            };
            BaseFieldConfig: {
                type: string;
                description: string;
                properties: {
                    name: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                        description: string;
                    };
                    disabled: {
                        type: string;
                        description: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                        description: string;
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                        description: string;
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                        description: string;
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                        description: string;
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        description: string;
                    };
                    visibleIf: {
                        $ref: string;
                        description: string;
                    };
                    disabledIf: {
                        $ref: string;
                        description: string;
                    };
                    readonlyIf: {
                        $ref: string;
                        description: string;
                    };
                    requiredIf: {
                        $ref: string;
                        description: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                };
            };
            FieldType: {
                type: string;
                description: string;
                enum: string[];
            };
            TextFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    placeholder: {
                        type: string;
                    };
                    maxLength: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    showClearButton: {
                        type: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    mode: {
                        enum: string[];
                        description: string;
                    };
                    mask: {
                        type: string;
                        description: string;
                    };
                    maskRules: {
                        type: string;
                        description: string;
                        additionalProperties: {
                            type: string;
                        };
                    };
                    maskChar: {
                        type: string;
                        description: string;
                    };
                    maskInvalidMessage: {
                        type: string;
                        description: string;
                    };
                    useMaskedValue: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            NumberFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    placeholder: {
                        type: string;
                    };
                    showClearButton: {
                        type: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    min: {
                        type: string;
                        description: string;
                    };
                    max: {
                        type: string;
                        description: string;
                    };
                    step: {
                        type: string;
                        description: string;
                    };
                    showSpinButtons: {
                        type: string;
                        description: string;
                    };
                    format: {
                        oneOf: ({
                            type: string;
                            description: string;
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            description?: undefined;
                        })[];
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            NumberFormat: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    type: {
                        enum: string[];
                        description: string;
                    };
                    precision: {
                        type: string;
                        description: string;
                    };
                    currency: {
                        type: string;
                        description: string;
                    };
                };
            };
            DateFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        type: string;
                        description: string;
                    };
                    max: {
                        type: string;
                        description: string;
                    };
                    displayFormat: {
                        type: string;
                        description: string;
                    };
                    format: {
                        type: string;
                        description: string;
                    };
                    showClearButton: {
                        type: string;
                        description: string;
                    };
                    placeholder: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    pickerType: {
                        enum: string[];
                        description: string;
                    };
                    useMaskBehavior: {
                        type: string;
                        description: string;
                    };
                    openOnFieldClick: {
                        type: string;
                        description: string;
                    };
                    dateSerializationFormat: {
                        type: string;
                        description: string;
                    };
                    calendarOptions: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            DateTimeFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    max: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    displayFormat: {
                        type: string;
                        description: string;
                    };
                    format: {
                        type: string;
                        description: string;
                    };
                    showClearButton: {
                        type: string;
                        description: string;
                    };
                    placeholder: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    pickerType: {
                        enum: string[];
                        description: string;
                    };
                    useMaskBehavior: {
                        type: string;
                        description: string;
                    };
                    openOnFieldClick: {
                        type: string;
                        description: string;
                    };
                    dateSerializationFormat: {
                        type: string;
                        description: string;
                    };
                    calendarOptions: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            TimeFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        type: string;
                        description: string;
                    };
                    max: {
                        type: string;
                        description: string;
                    };
                    displayFormat: {
                        type: string;
                        description: string;
                    };
                    format: {
                        type: string;
                        description: string;
                    };
                    showClearButton: {
                        type: string;
                        description: string;
                    };
                    interval: {
                        type: string;
                        description: string;
                    };
                    placeholder: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    pickerType: {
                        enum: string[];
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            DateRangeFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    max: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    startDateExpr: {
                        type: string;
                        description: string;
                    };
                    endDateExpr: {
                        type: string;
                        description: string;
                    };
                    displayFormat: {
                        type: string;
                        description: string;
                    };
                    format: {
                        type: string;
                        description: string;
                    };
                    showClearButton: {
                        type: string;
                        description: string;
                    };
                    placeholder: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                        properties: {
                            start: {
                                type: string;
                            };
                            end: {
                                type: string;
                            };
                        };
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    openOnFieldClick: {
                        type: string;
                        description: string;
                    };
                    dateSerializationFormat: {
                        type: string;
                        description: string;
                    };
                    calendarOptions: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            BooleanFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    text: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            SwitchFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    switchedOnText: {
                        type: string;
                        description: string;
                    };
                    switchedOffText: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    cssClass: {
                        type: string;
                        description: string;
                    };
                    helpText: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            DropdownFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    lookup: {
                        $ref: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    placeholder: {
                        type: string;
                    };
                    showClearButton: {
                        type: string;
                    };
                    value: {
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    options: {
                        type: string;
                        items: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    value: {};
                                    text: {
                                        type: string;
                                    };
                                };
                            })[];
                        };
                        description: string;
                    };
                    valueExpr: {
                        type: string;
                        default: string;
                    };
                    displayExpr: {
                        type: string;
                        default: string;
                    };
                    searchEnabled: {
                        type: string;
                    };
                    acceptCustomValue: {
                        type: string;
                    };
                    showDropDownButton: {
                        type: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            TagBoxFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    lookup: {
                        $ref: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    placeholder: {
                        type: string;
                    };
                    showClearButton: {
                        type: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    options: {
                        type: string;
                        items: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    value: {};
                                    text: {
                                        type: string;
                                    };
                                };
                            })[];
                        };
                        description: string;
                    };
                    valueExpr: {
                        type: string;
                        default: string;
                    };
                    displayExpr: {
                        type: string;
                        default: string;
                    };
                    searchEnabled: {
                        type: string;
                    };
                    showSelectionControls: {
                        type: string;
                        description: string;
                    };
                    applyValueMode: {
                        enum: string[];
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            RadioGroupFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    lookup: {
                        $ref: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    placeholder: {
                        type: string;
                    };
                    showClearButton: {
                        type: string;
                    };
                    value: {
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    options: {
                        type: string;
                        items: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    value: {};
                                    text: {
                                        type: string;
                                    };
                                };
                            })[];
                        };
                        description: string;
                    };
                    valueExpr: {
                        type: string;
                        default: string;
                    };
                    displayExpr: {
                        type: string;
                        default: string;
                    };
                    layout: {
                        enum: string[];
                        description: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            SliderFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        type: string;
                        description: string;
                    };
                    max: {
                        type: string;
                        description: string;
                    };
                    step: {
                        type: string;
                        description: string;
                    };
                    showRange: {
                        type: string;
                        description: string;
                    };
                    tooltip: {
                        type: string;
                        additionalProperties: boolean;
                        description: string;
                        properties: {
                            enabled: {
                                type: string;
                                description: string;
                            };
                            format: {
                                type: string;
                                description: string;
                            };
                            showMode: {
                                type: string;
                                enum: string[];
                                description: string;
                            };
                        };
                    };
                };
                required: string[];
            };
            RangeSliderFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        type: string;
                        description: string;
                    };
                    max: {
                        type: string;
                        description: string;
                    };
                    step: {
                        type: string;
                        description: string;
                    };
                    start: {
                        type: string;
                        description: string;
                    };
                    end: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            TextAreaFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                    };
                    placeholder: {
                        type: string;
                    };
                    maxLength: {
                        type: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    autoResizeEnabled: {
                        type: string;
                        description: string;
                    };
                    showClearButton: {
                        type: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            HtmlEditorFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    toolbar: {
                        type: string;
                        additionalProperties: boolean;
                        description: string;
                        properties: {
                            items: {
                                type: string;
                                description: string;
                                items: {
                                    oneOf: ({
                                        type: string;
                                        description: string;
                                        enum: string[];
                                        additionalProperties?: undefined;
                                        properties?: undefined;
                                    } | {
                                        type: string;
                                        description: string;
                                        additionalProperties: boolean;
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            acceptedValues: {
                                                type: string;
                                                description: string;
                                                items: {
                                                    oneOf: {
                                                        type: string;
                                                    }[];
                                                };
                                            };
                                            options: {
                                                type: string;
                                                description: string;
                                            };
                                            showText: {
                                                type: string;
                                                enum: string[];
                                                description: string;
                                            };
                                            text: {
                                                type: string;
                                                description: string;
                                            };
                                            visible: {
                                                type: string;
                                                description: string;
                                            };
                                            widget: {
                                                type: string;
                                                description: string;
                                            };
                                            location: {
                                                type: string;
                                                enum: string[];
                                                description: string;
                                            };
                                            formatName: {
                                                type: string;
                                                description: string;
                                            };
                                            formatValues: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        enum?: undefined;
                                    })[];
                                };
                            };
                            multiline: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                    mediaResizing: {
                        type: string;
                        additionalProperties: boolean;
                        description: string;
                        properties: {
                            enabled: {
                                type: string;
                            };
                        };
                    };
                    valueType: {
                        type: string;
                        enum: string[];
                        description: string;
                    };
                    placeholder: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            ColorBoxFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    applyValueMode: {
                        type: string;
                        enum: string[];
                        description: string;
                    };
                    editAlphaChannel: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            AutocompleteFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    lookup: {
                        $ref: string;
                    };
                    minSearchLength: {
                        type: string;
                        description: string;
                    };
                    searchTimeout: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            LookupFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    lookup: {
                        $ref: string;
                    };
                    searchEnabled: {
                        type: string;
                        description: string;
                    };
                    minSearchLength: {
                        type: string;
                        description: string;
                    };
                    searchTimeout: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            CalendarFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    min: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    max: {
                        oneOf: {
                            type: string;
                            format: string;
                        }[];
                        description: string;
                    };
                    firstDayOfWeek: {
                        type: string;
                        minimum: number;
                        maximum: number;
                        description: string;
                    };
                    zoomLevel: {
                        type: string;
                        enum: string[];
                        description: string;
                    };
                };
                required: string[];
            };
            FormPreferences: {
                type: string;
                additionalProperties: boolean;
                description: string;
                properties: {
                    addSaveBtn: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    saveLimit: {
                        type: string;
                        default: null;
                        description: string;
                    };
                    saveUrl: {
                        type: string;
                        description: string;
                    };
                    computedRuleResults: {
                        type: string;
                        enum: string[];
                        default: string;
                        description: string;
                    };
                    storeComputedResults: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                };
            };
            ItemConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    id: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    type: {
                        type: string;
                        enum: string[];
                    };
                    items: {
                        type: string;
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                    dataTransformation: {
                        type: string;
                        description: string;
                    };
                    toolbar: {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            items: {
                                type: string;
                                items: {
                                    type: string;
                                    additionalProperties: boolean;
                                    properties: {
                                        location: {
                                            type: string;
                                            enum: string[];
                                        };
                                        widget: {
                                            type: string;
                                            enum: string[];
                                        };
                                        options: {
                                            type: string;
                                            additionalProperties: boolean;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    dataSource: {
                        description: string;
                    };
                    editing: {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            allowAdding: {
                                type: string;
                            };
                            allowUpdating: {
                                type: string;
                            };
                            allowDeleting: {
                                type: string;
                            };
                            mode: {
                                type: string;
                                enum: string[];
                            };
                        };
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    keyExpr: {
                        type: string;
                        description: string;
                    };
                    parentIdExpr: {
                        type: string;
                        description: string;
                    };
                    validationRules: {
                        type: string;
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                    computedRules: {
                        type: string;
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                    autoExpandAll: {
                        type: string;
                        description: string;
                    };
                    showRowLines: {
                        type: string;
                        description: string;
                    };
                    showBorders: {
                        type: string;
                        description: string;
                    };
                    columnAutoWidth: {
                        type: string;
                        description: string;
                    };
                    allowColumnReordering: {
                        type: string;
                        description: string;
                    };
                    allowColumnResizing: {
                        type: string;
                        description: string;
                    };
                    showColumnHeaders: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            ComputedRule: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    type: {
                        type: string;
                        enum: string[];
                        description: string;
                    };
                    fieldName: {
                        type: string;
                        description: string;
                    };
                    subtype: {
                        type: string;
                        enum: string[];
                        description: string;
                    };
                    correctAnswer: {
                        description: string;
                    };
                    keywords: {
                        type: string;
                        properties: {
                            required: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            optional: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        description: string;
                    };
                    points: {
                        type: string;
                        description: string;
                    };
                    penalty: {
                        type: string;
                        description: string;
                    };
                    partialCredit: {
                        type: string;
                        description: string;
                    };
                    tolerance: {
                        type: string;
                        description: string;
                    };
                    minLength: {
                        type: string;
                        description: string;
                    };
                    message: {
                        type: string;
                        description: string;
                    };
                    inputFields: {
                        type: string;
                        items: {
                            type: string;
                        };
                        description: string;
                    };
                    categoryMapping: {
                        type: string;
                        additionalProperties: {
                            type: string;
                        };
                        description: string;
                    };
                    evaluationRules: {
                        type: string;
                        items: {
                            type: string;
                            additionalProperties: boolean;
                            properties: {
                                condition: {
                                    $ref: string;
                                    description: string;
                                };
                                result: {
                                    type: string;
                                    description: string;
                                };
                                message: {
                                    type: string;
                                    description: string;
                                };
                            };
                            required: string[];
                        };
                        description: string;
                    };
                    returnToFrontend: {
                        type: string;
                        description: string;
                    };
                    storeResult: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            FormConfig: {
                type: string;
                additionalProperties: boolean;
                description: string;
                properties: {
                    title: {
                        type: string;
                        description: string;
                    };
                    description: {
                        type: string;
                        description: string;
                    };
                    slug: {
                        type: string;
                        description: string;
                    };
                    preferences: {
                        $ref: string;
                        description: string;
                    };
                    itemConfig: {
                        $ref: string;
                        description: string;
                    };
                    isActive: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    createdBy: {
                        type: string;
                        description: string;
                    };
                    tags: {
                        type: string;
                        items: {
                            type: string;
                        };
                        description: string;
                    };
                    version: {
                        type: string;
                        default: string;
                        description: string;
                    };
                    isPublic: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    allowedUsers: {
                        type: string;
                        items: {
                            type: string;
                        };
                        description: string;
                    };
                };
                required: string[];
            };
            GridFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    type: {
                        enum: string[];
                    };
                    config: {
                        $ref: string;
                    };
                };
                required: string[];
            };
            TreeFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    type: {
                        enum: string[];
                    };
                    config: {
                        $ref: string;
                    };
                };
                required: string[];
            };
            FormFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    type: {
                        enum: string[];
                    };
                    config: {
                        oneOf: ({
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        } | {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        })[];
                    };
                };
                required: string[];
            };
            GroupFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    caption: {
                        type: string;
                        description: string;
                    };
                    captionRender: {
                        type: string;
                        description: string;
                    };
                    colCount: {
                        oneOf: ({
                            type: string;
                            enum?: undefined;
                        } | {
                            enum: string[];
                            type?: undefined;
                        })[];
                        description: string;
                    };
                    excludeFromPath: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            TabbedFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    excludeFromPath: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    tabPanelOptions: {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                    };
                };
                required: string[];
            };
            TabFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    tabTitle: {
                        type: string;
                        description: string;
                    };
                    tabIcon: {
                        type: string;
                        description: string;
                    };
                    tabColCount: {
                        type: string;
                        description: string;
                    };
                    excludeFromPath: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                required: string[];
            };
            StepperFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    excludeFromPath: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    stepperOptions: {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            showNavButtons: {
                                type: string;
                                description: string;
                            };
                            showTitle: {
                                type: string;
                                description: string;
                            };
                            orientation: {
                                enum: string[];
                                description: string;
                            };
                        };
                    };
                };
                required: string[];
            };
            StepFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    stepTitle: {
                        type: string;
                        description: string;
                    };
                    stepIcon: {
                        type: string;
                        description: string;
                    };
                    excludeFromPath: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                required: string[];
            };
            ButtonFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    buttonOptions: {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            text: {
                                type: string;
                                description: string;
                            };
                            icon: {
                                type: string;
                                description: string;
                            };
                            type: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            stylingMode: {
                                type: string;
                                description: string;
                                enum: string[];
                            };
                            onClick: {
                                oneOf: ({
                                    type: string;
                                    additionalProperties?: undefined;
                                    properties?: undefined;
                                    required?: undefined;
                                } | {
                                    type: string;
                                    additionalProperties: boolean;
                                    properties: {
                                        handler: {
                                            type: string;
                                        };
                                        params: {
                                            type: string;
                                            additionalProperties: boolean;
                                        };
                                    };
                                    required: string[];
                                })[];
                                description: string;
                            };
                        };
                    };
                };
                required: string[];
            };
            EmptyFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                };
                required: string[];
            };
            InfoFieldConfig: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                    };
                    label: {
                        oneOf: ({
                            type: string;
                            properties?: undefined;
                        } | {
                            type: string;
                            properties: {
                                text: {
                                    type: string;
                                };
                                visible: {
                                    type: string;
                                };
                                location: {
                                    enum: string[];
                                };
                            };
                        })[];
                        description: string;
                    };
                    visible: {
                        type: string;
                    };
                    disabled: {
                        type: string;
                    };
                    width: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    height: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    minHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    maxHeight: {
                        oneOf: {
                            type: string;
                        }[];
                    };
                    validationRules: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    visibleIf: {
                        $ref: string;
                    };
                    disabledIf: {
                        $ref: string;
                    };
                    readonlyIf: {
                        $ref: string;
                    };
                    requiredIf: {
                        $ref: string;
                    };
                    allowEditing: {
                        type: string;
                        description: string;
                    };
                    allowSorting: {
                        type: string;
                        description: string;
                    };
                    allowFiltering: {
                        type: string;
                        description: string;
                    };
                    type: {
                        enum: string[];
                    };
                    text: {
                        type: string;
                        description: string;
                    };
                    variant: {
                        enum: string[];
                        description: string;
                    };
                    icon: {
                        oneOf: {
                            type: string;
                        }[];
                        description: string;
                    };
                    dismissible: {
                        type: string;
                        description: string;
                    };
                    html: {
                        type: string;
                        description: string;
                    };
                    cssClass: {
                        type: string;
                    };
                    helpText: {
                        type: string;
                    };
                    readOnly: {
                        type: string;
                    };
                    colSpan: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
            FieldConfig: {
                oneOf: {
                    $ref: string;
                }[];
                discriminator: {
                    propertyName: string;
                };
            };
        };
    };
};
/**
 * Convenience getter functions for singleton instances
 *
 * @example
 * ```typescript
 * import { getVersionManager, getSchemaCache, getPerformanceMonitor } from 'formfiller-schema';
 *
 * // Use version manager
 * const migrated = getVersionManager().migrate(oldConfig, '2.0.0');
 *
 * // Use cache
 * const validator = getSchemaCache().getValidator('mySchema', schema);
 *
 * // Monitor performance
 * const result = getPerformanceMonitor().measure('validation', () => validator(config));
 * ```
 */
declare const _default: {
    interfaces: typeof interfaces;
    validateField: typeof validateField;
    validateItem: typeof validateItem;
    validateView: typeof validateView;
    schemas: {
        completeSchema: {
            $schema: string;
            title: string;
            description: string;
            definitions: {
                ValidationRule: {
                    type: string;
                    description: string;
                    oneOf: ({
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            min: {
                                type: string;
                                description: string;
                            };
                            max: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf: {
                            required: string[];
                        }[];
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            pattern: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            comparisonTarget: {
                                type: string;
                                description: string;
                            };
                            comparisonType: {
                                enum: string[];
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            validationCallback: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            apiEndpoint: {
                                type: string;
                                description: string;
                            };
                            apiMethod: {
                                enum: string[];
                                description: string;
                            };
                            apiPayload: {
                                type: string;
                                description: string;
                            };
                            apiTimeout: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            subtype: {
                                enum: string[];
                                description: string;
                            };
                            correctAnswer: {
                                description: string;
                            };
                            points: {
                                type: string;
                                description: string;
                            };
                            penalty: {
                                type: string;
                                description: string;
                            };
                            partialCredit: {
                                type: string;
                                description: string;
                            };
                            keywords: {
                                type: string;
                                properties: {
                                    required: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                    optional: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                                description: string;
                            };
                            minLength: {
                                type: string;
                                description: string;
                            };
                            tolerance: {
                                type: string;
                                description: string;
                            };
                            compute: {
                                type: string;
                                description: string;
                            };
                            returnToFrontend: {
                                type: string;
                                description: string;
                            };
                            storeResult: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            validFrom: {
                                type: string;
                                format: string;
                                description: string;
                            };
                            validUntil: {
                                type: string;
                                format: string;
                                description: string;
                            };
                            schedule: {
                                type: string;
                                description: string;
                            };
                            timezone: {
                                type: string;
                                description: string;
                            };
                            gracePeriod: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            type: {
                                enum: string[];
                            };
                            pluginName: {
                                type: string;
                                description: string;
                            };
                            pluginConfig: {
                                type: string;
                                description: string;
                            };
                            message: {
                                type: string;
                                description: string;
                            };
                            when: {
                                $ref: string;
                                description: string;
                            };
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            and?: undefined;
                            groupMessage?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            and: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                minItems: number;
                                description: string;
                            };
                            groupMessage: {
                                type: string;
                                description: string;
                            };
                            stopOnFirstError: {
                                type: string;
                                description: string;
                            };
                            type?: undefined;
                            message?: undefined;
                            when?: undefined;
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            or: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                minItems: number;
                                description: string;
                            };
                            groupMessage: {
                                type: string;
                                description: string;
                            };
                            stopOnFirstError: {
                                type: string;
                                description: string;
                            };
                            type?: undefined;
                            message?: undefined;
                            when?: undefined;
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    } | {
                        type: string;
                        description: string;
                        additionalProperties: boolean;
                        properties: {
                            not: {
                                $ref: string;
                                description: string;
                            };
                            groupMessage: {
                                type: string;
                                description: string;
                            };
                            type?: undefined;
                            message?: undefined;
                            when?: undefined;
                            min?: undefined;
                            max?: undefined;
                            pattern?: undefined;
                            comparisonTarget?: undefined;
                            comparisonType?: undefined;
                            validationCallback?: undefined;
                            apiEndpoint?: undefined;
                            apiMethod?: undefined;
                            apiPayload?: undefined;
                            apiTimeout?: undefined;
                            subtype?: undefined;
                            correctAnswer?: undefined;
                            points?: undefined;
                            penalty?: undefined;
                            partialCredit?: undefined;
                            keywords?: undefined;
                            minLength?: undefined;
                            tolerance?: undefined;
                            compute?: undefined;
                            returnToFrontend?: undefined;
                            storeResult?: undefined;
                            validFrom?: undefined;
                            validUntil?: undefined;
                            schedule?: undefined;
                            timezone?: undefined;
                            gracePeriod?: undefined;
                            pluginName?: undefined;
                            pluginConfig?: undefined;
                            and?: undefined;
                            stopOnFirstError?: undefined;
                            or?: undefined;
                        };
                        required: string[];
                        anyOf?: undefined;
                    })[];
                };
                ConditionalField: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        field: {
                            type: string;
                            description: string;
                        };
                        operator: {
                            enum: string[];
                            description: string;
                        };
                        value: {
                            description: string;
                        };
                    };
                    required: string[];
                };
                ConditionalExpression: {
                    description: string;
                    anyOf: ({
                        type: string;
                        description: string;
                        properties: {
                            and: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                minItems: number;
                            };
                            or?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        additionalProperties: boolean;
                        patternProperties?: undefined;
                        minProperties?: undefined;
                    } | {
                        type: string;
                        description: string;
                        properties: {
                            or: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                minItems: number;
                            };
                            and?: undefined;
                            not?: undefined;
                        };
                        required: string[];
                        additionalProperties: boolean;
                        patternProperties?: undefined;
                        minProperties?: undefined;
                    } | {
                        type: string;
                        description: string;
                        properties: {
                            not: {
                                $ref: string;
                            };
                            and?: undefined;
                            or?: undefined;
                        };
                        required: string[];
                        additionalProperties: boolean;
                        patternProperties?: undefined;
                        minProperties?: undefined;
                    } | {
                        type: string;
                        description: string;
                        patternProperties: {
                            "^(?!and$|or$|not$).*$": {
                                type: string;
                                minItems: number;
                                maxItems: number;
                                items: ({
                                    type: string;
                                    enum: string[];
                                    items?: undefined;
                                    minItems?: undefined;
                                } | {
                                    type: string;
                                    items: {
                                        oneOf: {
                                            type: string;
                                        }[];
                                    };
                                    minItems: number;
                                    enum?: undefined;
                                })[];
                                not?: undefined;
                                oneOf?: undefined;
                            };
                        };
                        additionalProperties: boolean;
                        minProperties: number;
                        properties?: undefined;
                        required?: undefined;
                    } | {
                        type: string;
                        description: string;
                        patternProperties: {
                            "^(?!and$|or$|not$).*$": {
                                type: string;
                                minItems: number;
                                maxItems: number;
                                items: ({
                                    type: string;
                                    enum: string[];
                                    oneOf?: undefined;
                                } | {
                                    oneOf: {
                                        type: string;
                                    }[];
                                    type?: undefined;
                                    enum?: undefined;
                                })[];
                                not?: undefined;
                                oneOf?: undefined;
                            };
                        };
                        additionalProperties: boolean;
                        minProperties: number;
                        properties?: undefined;
                        required?: undefined;
                    } | {
                        type: string;
                        description: string;
                        patternProperties: {
                            "^(?!and$|or$|not$).*$": {
                                type: string;
                                minItems: number;
                                maxItems: number;
                                items: ({
                                    type: string;
                                    enum: string[];
                                } | {
                                    type: string;
                                    enum?: undefined;
                                })[];
                                not?: undefined;
                                oneOf?: undefined;
                            };
                        };
                        additionalProperties: boolean;
                        minProperties: number;
                        properties?: undefined;
                        required?: undefined;
                    } | {
                        type: string;
                        description: string;
                        patternProperties: {
                            "^(?!and$|or$|not$).*$": {
                                type: string;
                                items: {
                                    oneOf: {
                                        type: string;
                                    }[];
                                };
                                minItems: number;
                                not: {
                                    contains: {
                                        type: string;
                                    };
                                };
                                maxItems?: undefined;
                                oneOf?: undefined;
                            };
                        };
                        additionalProperties: boolean;
                        minProperties: number;
                        properties?: undefined;
                        required?: undefined;
                    } | {
                        type: string;
                        description: string;
                        patternProperties: {
                            "^(?!and$|or$|not$).*$": {
                                oneOf: {
                                    type: string;
                                }[];
                                type?: undefined;
                                minItems?: undefined;
                                maxItems?: undefined;
                                items?: undefined;
                                not?: undefined;
                            };
                        };
                        additionalProperties: boolean;
                        minProperties: number;
                        properties?: undefined;
                        required?: undefined;
                    })[];
                };
                LookupConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        dataSource: {
                            type: string;
                            description: string;
                        };
                        displayExpr: {
                            type: string;
                            description: string;
                        };
                        valueExpr: {
                            type: string;
                            description: string;
                        };
                        setCellValue: {
                            type: string;
                            description: string;
                        };
                        dependsOn: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                    };
                    required: string[];
                };
                BaseFieldConfig: {
                    type: string;
                    description: string;
                    properties: {
                        name: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                            description: string;
                        };
                        disabled: {
                            type: string;
                            description: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        visibleIf: {
                            $ref: string;
                            description: string;
                        };
                        disabledIf: {
                            $ref: string;
                            description: string;
                        };
                        readonlyIf: {
                            $ref: string;
                            description: string;
                        };
                        requiredIf: {
                            $ref: string;
                            description: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                    };
                };
                FieldType: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                TextFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        placeholder: {
                            type: string;
                        };
                        maxLength: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        showClearButton: {
                            type: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        mode: {
                            enum: string[];
                            description: string;
                        };
                        mask: {
                            type: string;
                            description: string;
                        };
                        maskRules: {
                            type: string;
                            description: string;
                            additionalProperties: {
                                type: string;
                            };
                        };
                        maskChar: {
                            type: string;
                            description: string;
                        };
                        maskInvalidMessage: {
                            type: string;
                            description: string;
                        };
                        useMaskedValue: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                NumberFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        placeholder: {
                            type: string;
                        };
                        showClearButton: {
                            type: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        step: {
                            type: string;
                            description: string;
                        };
                        showSpinButtons: {
                            type: string;
                            description: string;
                        };
                        format: {
                            oneOf: ({
                                type: string;
                                description: string;
                                $ref?: undefined;
                            } | {
                                $ref: string;
                                type?: undefined;
                                description?: undefined;
                            })[];
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                NumberFormat: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        type: {
                            enum: string[];
                            description: string;
                        };
                        precision: {
                            type: string;
                            description: string;
                        };
                        currency: {
                            type: string;
                            description: string;
                        };
                    };
                };
                DateFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        displayFormat: {
                            type: string;
                            description: string;
                        };
                        format: {
                            type: string;
                            description: string;
                        };
                        showClearButton: {
                            type: string;
                            description: string;
                        };
                        placeholder: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        pickerType: {
                            enum: string[];
                            description: string;
                        };
                        useMaskBehavior: {
                            type: string;
                            description: string;
                        };
                        openOnFieldClick: {
                            type: string;
                            description: string;
                        };
                        dateSerializationFormat: {
                            type: string;
                            description: string;
                        };
                        calendarOptions: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                DateTimeFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        max: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        displayFormat: {
                            type: string;
                            description: string;
                        };
                        format: {
                            type: string;
                            description: string;
                        };
                        showClearButton: {
                            type: string;
                            description: string;
                        };
                        placeholder: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        pickerType: {
                            enum: string[];
                            description: string;
                        };
                        useMaskBehavior: {
                            type: string;
                            description: string;
                        };
                        openOnFieldClick: {
                            type: string;
                            description: string;
                        };
                        dateSerializationFormat: {
                            type: string;
                            description: string;
                        };
                        calendarOptions: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                TimeFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        displayFormat: {
                            type: string;
                            description: string;
                        };
                        format: {
                            type: string;
                            description: string;
                        };
                        showClearButton: {
                            type: string;
                            description: string;
                        };
                        interval: {
                            type: string;
                            description: string;
                        };
                        placeholder: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        pickerType: {
                            enum: string[];
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                DateRangeFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        max: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        startDateExpr: {
                            type: string;
                            description: string;
                        };
                        endDateExpr: {
                            type: string;
                            description: string;
                        };
                        displayFormat: {
                            type: string;
                            description: string;
                        };
                        format: {
                            type: string;
                            description: string;
                        };
                        showClearButton: {
                            type: string;
                            description: string;
                        };
                        placeholder: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                            properties: {
                                start: {
                                    type: string;
                                };
                                end: {
                                    type: string;
                                };
                            };
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        openOnFieldClick: {
                            type: string;
                            description: string;
                        };
                        dateSerializationFormat: {
                            type: string;
                            description: string;
                        };
                        calendarOptions: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                BooleanFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        text: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                SwitchFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        switchedOnText: {
                            type: string;
                            description: string;
                        };
                        switchedOffText: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        cssClass: {
                            type: string;
                            description: string;
                        };
                        helpText: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                DropdownFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        lookup: {
                            $ref: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        placeholder: {
                            type: string;
                        };
                        showClearButton: {
                            type: string;
                        };
                        value: {
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        options: {
                            type: string;
                            items: {
                                oneOf: ({
                                    type: string;
                                    properties?: undefined;
                                } | {
                                    type: string;
                                    properties: {
                                        value: {};
                                        text: {
                                            type: string;
                                        };
                                    };
                                })[];
                            };
                            description: string;
                        };
                        valueExpr: {
                            type: string;
                            default: string;
                        };
                        displayExpr: {
                            type: string;
                            default: string;
                        };
                        searchEnabled: {
                            type: string;
                        };
                        acceptCustomValue: {
                            type: string;
                        };
                        showDropDownButton: {
                            type: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                TagBoxFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        lookup: {
                            $ref: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        placeholder: {
                            type: string;
                        };
                        showClearButton: {
                            type: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        options: {
                            type: string;
                            items: {
                                oneOf: ({
                                    type: string;
                                    properties?: undefined;
                                } | {
                                    type: string;
                                    properties: {
                                        value: {};
                                        text: {
                                            type: string;
                                        };
                                    };
                                })[];
                            };
                            description: string;
                        };
                        valueExpr: {
                            type: string;
                            default: string;
                        };
                        displayExpr: {
                            type: string;
                            default: string;
                        };
                        searchEnabled: {
                            type: string;
                        };
                        showSelectionControls: {
                            type: string;
                            description: string;
                        };
                        applyValueMode: {
                            enum: string[];
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                RadioGroupFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        lookup: {
                            $ref: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        placeholder: {
                            type: string;
                        };
                        showClearButton: {
                            type: string;
                        };
                        value: {
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        options: {
                            type: string;
                            items: {
                                oneOf: ({
                                    type: string;
                                    properties?: undefined;
                                } | {
                                    type: string;
                                    properties: {
                                        value: {};
                                        text: {
                                            type: string;
                                        };
                                    };
                                })[];
                            };
                            description: string;
                        };
                        valueExpr: {
                            type: string;
                            default: string;
                        };
                        displayExpr: {
                            type: string;
                            default: string;
                        };
                        layout: {
                            enum: string[];
                            description: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                SliderFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        step: {
                            type: string;
                            description: string;
                        };
                        showRange: {
                            type: string;
                            description: string;
                        };
                        tooltip: {
                            type: string;
                            additionalProperties: boolean;
                            description: string;
                            properties: {
                                enabled: {
                                    type: string;
                                    description: string;
                                };
                                format: {
                                    type: string;
                                    description: string;
                                };
                                showMode: {
                                    type: string;
                                    enum: string[];
                                    description: string;
                                };
                            };
                        };
                    };
                    required: string[];
                };
                RangeSliderFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            type: string;
                            description: string;
                        };
                        max: {
                            type: string;
                            description: string;
                        };
                        step: {
                            type: string;
                            description: string;
                        };
                        start: {
                            type: string;
                            description: string;
                        };
                        end: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                TextAreaFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                        };
                        placeholder: {
                            type: string;
                        };
                        maxLength: {
                            type: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        autoResizeEnabled: {
                            type: string;
                            description: string;
                        };
                        showClearButton: {
                            type: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                HtmlEditorFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        toolbar: {
                            type: string;
                            additionalProperties: boolean;
                            description: string;
                            properties: {
                                items: {
                                    type: string;
                                    description: string;
                                    items: {
                                        oneOf: ({
                                            type: string;
                                            description: string;
                                            enum: string[];
                                            additionalProperties?: undefined;
                                            properties?: undefined;
                                        } | {
                                            type: string;
                                            description: string;
                                            additionalProperties: boolean;
                                            properties: {
                                                name: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                                acceptedValues: {
                                                    type: string;
                                                    description: string;
                                                    items: {
                                                        oneOf: {
                                                            type: string;
                                                        }[];
                                                    };
                                                };
                                                options: {
                                                    type: string;
                                                    description: string;
                                                };
                                                showText: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                                text: {
                                                    type: string;
                                                    description: string;
                                                };
                                                visible: {
                                                    type: string;
                                                    description: string;
                                                };
                                                widget: {
                                                    type: string;
                                                    description: string;
                                                };
                                                location: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                                formatName: {
                                                    type: string;
                                                    description: string;
                                                };
                                                formatValues: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            enum?: undefined;
                                        })[];
                                    };
                                };
                                multiline: {
                                    type: string;
                                    description: string;
                                };
                            };
                        };
                        mediaResizing: {
                            type: string;
                            additionalProperties: boolean;
                            description: string;
                            properties: {
                                enabled: {
                                    type: string;
                                };
                            };
                        };
                        valueType: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        placeholder: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                ColorBoxFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        applyValueMode: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        editAlphaChannel: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                AutocompleteFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        lookup: {
                            $ref: string;
                        };
                        minSearchLength: {
                            type: string;
                            description: string;
                        };
                        searchTimeout: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                LookupFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        lookup: {
                            $ref: string;
                        };
                        searchEnabled: {
                            type: string;
                            description: string;
                        };
                        minSearchLength: {
                            type: string;
                            description: string;
                        };
                        searchTimeout: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                CalendarFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        min: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        max: {
                            oneOf: {
                                type: string;
                                format: string;
                            }[];
                            description: string;
                        };
                        firstDayOfWeek: {
                            type: string;
                            minimum: number;
                            maximum: number;
                            description: string;
                        };
                        zoomLevel: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                    };
                    required: string[];
                };
                FormPreferences: {
                    type: string;
                    additionalProperties: boolean;
                    description: string;
                    properties: {
                        addSaveBtn: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        saveLimit: {
                            type: string;
                            default: null;
                            description: string;
                        };
                        saveUrl: {
                            type: string;
                            description: string;
                        };
                        computedRuleResults: {
                            type: string;
                            enum: string[];
                            default: string;
                            description: string;
                        };
                        storeComputedResults: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                    };
                };
                ItemConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                        };
                        title: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                        type: {
                            type: string;
                            enum: string[];
                        };
                        items: {
                            type: string;
                            description: string;
                            items: {
                                $ref: string;
                            };
                        };
                        dataTransformation: {
                            type: string;
                            description: string;
                        };
                        toolbar: {
                            type: string;
                            description: string;
                            additionalProperties: boolean;
                            properties: {
                                items: {
                                    type: string;
                                    items: {
                                        type: string;
                                        additionalProperties: boolean;
                                        properties: {
                                            location: {
                                                type: string;
                                                enum: string[];
                                            };
                                            widget: {
                                                type: string;
                                                enum: string[];
                                            };
                                            options: {
                                                type: string;
                                                additionalProperties: boolean;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        dataSource: {
                            description: string;
                        };
                        editing: {
                            type: string;
                            description: string;
                            additionalProperties: boolean;
                            properties: {
                                allowAdding: {
                                    type: string;
                                };
                                allowUpdating: {
                                    type: string;
                                };
                                allowDeleting: {
                                    type: string;
                                };
                                mode: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        keyExpr: {
                            type: string;
                            description: string;
                        };
                        parentIdExpr: {
                            type: string;
                            description: string;
                        };
                        validationRules: {
                            type: string;
                            description: string;
                            items: {
                                $ref: string;
                            };
                        };
                        computedRules: {
                            type: string;
                            description: string;
                            items: {
                                $ref: string;
                            };
                        };
                        autoExpandAll: {
                            type: string;
                            description: string;
                        };
                        showRowLines: {
                            type: string;
                            description: string;
                        };
                        showBorders: {
                            type: string;
                            description: string;
                        };
                        columnAutoWidth: {
                            type: string;
                            description: string;
                        };
                        allowColumnReordering: {
                            type: string;
                            description: string;
                        };
                        allowColumnResizing: {
                            type: string;
                            description: string;
                        };
                        showColumnHeaders: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                ComputedRule: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        type: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        fieldName: {
                            type: string;
                            description: string;
                        };
                        subtype: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        correctAnswer: {
                            description: string;
                        };
                        keywords: {
                            type: string;
                            properties: {
                                required: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                optional: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                            };
                            description: string;
                        };
                        points: {
                            type: string;
                            description: string;
                        };
                        penalty: {
                            type: string;
                            description: string;
                        };
                        partialCredit: {
                            type: string;
                            description: string;
                        };
                        tolerance: {
                            type: string;
                            description: string;
                        };
                        minLength: {
                            type: string;
                            description: string;
                        };
                        message: {
                            type: string;
                            description: string;
                        };
                        inputFields: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        categoryMapping: {
                            type: string;
                            additionalProperties: {
                                type: string;
                            };
                            description: string;
                        };
                        evaluationRules: {
                            type: string;
                            items: {
                                type: string;
                                additionalProperties: boolean;
                                properties: {
                                    condition: {
                                        $ref: string;
                                        description: string;
                                    };
                                    result: {
                                        type: string;
                                        description: string;
                                    };
                                    message: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                            description: string;
                        };
                        returnToFrontend: {
                            type: string;
                            description: string;
                        };
                        storeResult: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                FormConfig: {
                    type: string;
                    additionalProperties: boolean;
                    description: string;
                    properties: {
                        title: {
                            type: string;
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                        slug: {
                            type: string;
                            description: string;
                        };
                        preferences: {
                            $ref: string;
                            description: string;
                        };
                        itemConfig: {
                            $ref: string;
                            description: string;
                        };
                        isActive: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        createdBy: {
                            type: string;
                            description: string;
                        };
                        tags: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        version: {
                            type: string;
                            default: string;
                            description: string;
                        };
                        isPublic: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        allowedUsers: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                    };
                    required: string[];
                };
                GridFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        type: {
                            enum: string[];
                        };
                        config: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                TreeFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        type: {
                            enum: string[];
                        };
                        config: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                FormFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        type: {
                            enum: string[];
                        };
                        config: {
                            oneOf: ({
                                $ref: string;
                                type?: undefined;
                                items?: undefined;
                            } | {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                $ref?: undefined;
                            })[];
                        };
                    };
                    required: string[];
                };
                GroupFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        caption: {
                            type: string;
                            description: string;
                        };
                        captionRender: {
                            type: string;
                            description: string;
                        };
                        colCount: {
                            oneOf: ({
                                type: string;
                                enum?: undefined;
                            } | {
                                enum: string[];
                                type?: undefined;
                            })[];
                            description: string;
                        };
                        excludeFromPath: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        items: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                TabbedFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        excludeFromPath: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        items: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        tabPanelOptions: {
                            type: string;
                            description: string;
                            additionalProperties: boolean;
                        };
                    };
                    required: string[];
                };
                TabFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        title: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        tabTitle: {
                            type: string;
                            description: string;
                        };
                        tabIcon: {
                            type: string;
                            description: string;
                        };
                        tabColCount: {
                            type: string;
                            description: string;
                        };
                        excludeFromPath: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        items: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    required: string[];
                };
                StepperFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        excludeFromPath: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        items: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        stepperOptions: {
                            type: string;
                            description: string;
                            additionalProperties: boolean;
                            properties: {
                                showNavButtons: {
                                    type: string;
                                    description: string;
                                };
                                showTitle: {
                                    type: string;
                                    description: string;
                                };
                                orientation: {
                                    enum: string[];
                                    description: string;
                                };
                            };
                        };
                    };
                    required: string[];
                };
                StepFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        title: {
                            type: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        stepTitle: {
                            type: string;
                            description: string;
                        };
                        stepIcon: {
                            type: string;
                            description: string;
                        };
                        excludeFromPath: {
                            type: string;
                            default: boolean;
                            description: string;
                        };
                        items: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    required: string[];
                };
                ButtonFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        buttonOptions: {
                            type: string;
                            description: string;
                            additionalProperties: boolean;
                            properties: {
                                text: {
                                    type: string;
                                    description: string;
                                };
                                icon: {
                                    type: string;
                                    description: string;
                                };
                                type: {
                                    type: string;
                                    description: string;
                                    enum: string[];
                                };
                                stylingMode: {
                                    type: string;
                                    description: string;
                                    enum: string[];
                                };
                                onClick: {
                                    oneOf: ({
                                        type: string;
                                        additionalProperties?: undefined;
                                        properties?: undefined;
                                        required?: undefined;
                                    } | {
                                        type: string;
                                        additionalProperties: boolean;
                                        properties: {
                                            handler: {
                                                type: string;
                                            };
                                            params: {
                                                type: string;
                                                additionalProperties: boolean;
                                            };
                                        };
                                        required: string[];
                                    })[];
                                    description: string;
                                };
                            };
                        };
                    };
                    required: string[];
                };
                EmptyFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                    };
                    required: string[];
                };
                InfoFieldConfig: {
                    type: string;
                    description: string;
                    additionalProperties: boolean;
                    properties: {
                        name: {
                            type: string;
                        };
                        label: {
                            oneOf: ({
                                type: string;
                                properties?: undefined;
                            } | {
                                type: string;
                                properties: {
                                    text: {
                                        type: string;
                                    };
                                    visible: {
                                        type: string;
                                    };
                                    location: {
                                        enum: string[];
                                    };
                                };
                            })[];
                            description: string;
                        };
                        visible: {
                            type: string;
                        };
                        disabled: {
                            type: string;
                        };
                        width: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        height: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        minHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        maxHeight: {
                            oneOf: {
                                type: string;
                            }[];
                        };
                        validationRules: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        visibleIf: {
                            $ref: string;
                        };
                        disabledIf: {
                            $ref: string;
                        };
                        readonlyIf: {
                            $ref: string;
                        };
                        requiredIf: {
                            $ref: string;
                        };
                        allowEditing: {
                            type: string;
                            description: string;
                        };
                        allowSorting: {
                            type: string;
                            description: string;
                        };
                        allowFiltering: {
                            type: string;
                            description: string;
                        };
                        type: {
                            enum: string[];
                        };
                        text: {
                            type: string;
                            description: string;
                        };
                        variant: {
                            enum: string[];
                            description: string;
                        };
                        icon: {
                            oneOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        dismissible: {
                            type: string;
                            description: string;
                        };
                        html: {
                            type: string;
                            description: string;
                        };
                        cssClass: {
                            type: string;
                        };
                        helpText: {
                            type: string;
                        };
                        readOnly: {
                            type: string;
                        };
                        colSpan: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                FieldConfig: {
                    oneOf: {
                        $ref: string;
                    }[];
                    discriminator: {
                        propertyName: string;
                    };
                };
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map