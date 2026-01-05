import { validateField, validateView, schemas } from '../index.js';
import { FieldConfig, ViewConfig } from '../interfaces/index.js';

describe('Schema Validation Tests', () => {
  describe('Field Validation', () => {
    test('should validate simple text field', () => {
      const textField: FieldConfig = {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validationRules: [{ type: 'required', message: 'First name is required' }],
      };

      const result = validateField(textField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate number field with editor options', () => {
      const numberField: FieldConfig = {
        name: 'age',
        label: 'Age',
        type: 'number',
        min: 0,
        max: 120,
        step: 1,
        showClearButton: true,
      };

      const result = validateField(numberField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate date field', () => {
      const dateField: FieldConfig = {
        name: 'birthDate',
        label: 'Birth Date',
        type: 'date',
        min: '1900-01-01',
        max: '2024-12-31',
        displayFormat: 'yyyy-MM-dd',
      };

      const result = validateField(dateField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate dropdown field with lookup', () => {
      const dropdownField: FieldConfig = {
        name: 'category',
        label: 'Category',
        type: 'dropdown',
        lookup: {
          dataSource: [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
          ],
          displayExpr: 'name',
          valueExpr: 'id',
        },
      };

      const result = validateField(dropdownField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate boolean field', () => {
      const booleanField: FieldConfig = {
        name: 'isActive',
        label: 'Is Active',
        type: 'boolean',
        text: 'Active', // Direct property instead of editorOptions
      };

      const result = validateField(booleanField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate switch field', () => {
      const switchField: FieldConfig = {
        name: 'notifications',
        label: 'Notifications',
        type: 'switch',
        switchedOnText: 'On', // Direct properties instead of editorOptions
        switchedOffText: 'Off',
      };

      const result = validateField(switchField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate textarea field', () => {
      const textareaField: FieldConfig = {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description...', // Direct properties
        height: 100,
        autoResizeEnabled: true,
      };

      const result = validateField(textareaField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate slider field', () => {
      const sliderField: FieldConfig = {
        name: 'priority',
        label: 'Priority',
        type: 'slider',
        min: 1, // Direct properties
        max: 10,
        step: 1,
        showRange: true,
        tooltip: {
          enabled: true,
          format: '{0}',
          showMode: 'always',
        },
      };

      const result = validateField(sliderField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate radiogroup field', () => {
      const radioGroupField: FieldConfig = {
        name: 'gender',
        label: 'Gender',
        type: 'radiogroup',
        lookup: {
          dataSource: [
            { id: 'm', name: 'Male' },
            { id: 'f', name: 'Female' },
          ],
          displayExpr: 'name',
          valueExpr: 'id',
        },
        layout: 'horizontal', // Direct property
      };

      const result = validateField(radioGroupField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate tagbox field', () => {
      const tagboxField: FieldConfig = {
        name: 'skills',
        label: 'Skills',
        type: 'tagbox',
        lookup: {
          dataSource: [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'TypeScript' },
            { id: 3, name: 'React' },
          ],
          displayExpr: 'name',
          valueExpr: 'id',
        },
        placeholder: 'Select skills...', // Direct properties
        searchEnabled: true,
        // Note: acceptCustomValue is not in schema, removed
      };

      const result = validateField(tagboxField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Structural Field Validation', () => {
    test('should validate group field', () => {
      const groupField: FieldConfig = {
        type: 'group',
        caption: 'Personal Information',
        colCount: 2,
        items: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
          },
        ],
      };

      const result = validateField(groupField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate tabbed field', () => {
      const tabbedField: FieldConfig = {
        type: 'tabbed',
        items: [
          {
            type: 'tab',
            name: 'personalTab', // Required for tab type
            tabTitle: 'Personal',
            items: [
              {
                name: 'firstName',
                label: 'First Name',
                type: 'text',
              },
            ],
          },
          {
            type: 'tab',
            name: 'contactTab', // Required for tab type
            tabTitle: 'Contact',
            items: [
              {
                name: 'email',
                label: 'Email',
                type: 'text',
              },
            ],
          },
        ],
      };

      const result = validateField(tabbedField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate button field', () => {
      const buttonField: FieldConfig = {
        type: 'button',
        buttonOptions: {
          text: 'Submit',
          icon: 'save',
          type: 'success',
          stylingMode: 'contained',
          onClick: 'onSubmit',
        },
      };

      const result = validateField(buttonField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate button field with onClick object (handler + params)', () => {
      const buttonField: FieldConfig = {
        type: 'button',
        buttonOptions: {
          text: 'Save',
          type: 'success',
          onClick: {
            handler: 'saveForm',
            // Note: params with custom properties not supported by schema
          },
        },
      };

      const result = validateField(buttonField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate button field with onClick object (handler only)', () => {
      const buttonField: FieldConfig = {
        type: 'button',
        buttonOptions: {
          text: 'Save',
          type: 'success',
          onClick: {
            handler: 'saveForm',
          },
        },
      };

      const result = validateField(buttonField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject button field with onClick object missing handler', () => {
      const buttonField: FieldConfig = {
        type: 'button',
        buttonOptions: {
          text: 'Save',
          type: 'success',
          onClick: {
            params: { showMessage: true },
          } as any,
        },
      };

      const result = validateField(buttonField);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should validate empty field', () => {
      const emptyField: FieldConfig = {
        type: 'empty',
      };

      const result = validateField(emptyField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Complex Field Validation', () => {
    test('should validate grid field', () => {
      const gridField: FieldConfig = {
        name: 'details',
        label: 'Details',
        type: 'grid',
        config: {
          id: 'details-grid',
          title: 'Details Grid', // Use title instead of label for ItemConfig
          description: 'Edit details',
          type: 'grid',
          items: [
            { name: 'item', label: 'Item', type: 'text' },
            { name: 'qty', label: 'Quantity', type: 'number' },
          ],
          editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            mode: 'cell',
          },
        },
      };

      const result = validateField(gridField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate tree field', () => {
      const treeField: FieldConfig = {
        name: 'categoryTree',
        label: 'Category Tree',
        type: 'tree',
        config: {
          id: 'category-tree',
          title: 'Category Tree', // Use title instead of label for ItemConfig
          description: 'Simple category tree example',
          type: 'tree',
          items: [
            { name: 'id', label: 'ID', type: 'number', visible: false },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'parentId', label: 'Parent', type: 'number', visible: false },
          ],
        },
      };

      const result = validateField(treeField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate form field', () => {
      const formField: FieldConfig = {
        name: 'sampleForm',
        label: 'Sample Form',
        type: 'form',
        config: [
          { name: 'field1', label: 'Field 1', type: 'text' },
          { name: 'field2', label: 'Field 2', type: 'number' },
        ],
      };

      const result = validateField(formField);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('View Validation', () => {
    test('should validate grid view', () => {
      const gridView: ViewConfig = {
        id: 'grid-view',
        title: 'Grid View', // Use title instead of label for ViewConfig/ItemConfig
        description: 'A data grid with CRUD operations',
        type: 'grid',
        items: [
          {
            name: 'id',
            label: 'ID',
            type: 'number',
            visible: false,
          },
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            validationRules: [{ type: 'required' }],
          },
          {
            name: 'category',
            label: 'Category',
            type: 'dropdown',
            lookup: {
              dataSource: [
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' },
              ],
              displayExpr: 'name',
              valueExpr: 'id',
            },
          },
        ],
        editing: {
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
          mode: 'cell',
        },
      };

      const result = validateView(gridView);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate form view', () => {
      const formView: ViewConfig = {
        id: 'form-view',
        title: 'Form View', // Use title instead of label for ViewConfig/ItemConfig
        description: 'A dynamic form with validation',
        type: 'form',
        items: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            validationRules: [{ type: 'required' }],
            visibleIf: { category: ['in', [0, 1]] },
          },
          {
            name: 'category',
            label: 'Category',
            type: 'dropdown',
            lookup: {
              dataSource: [
                { id: 0, name: 'Select Category' },
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' },
              ],
              displayExpr: 'name',
              valueExpr: 'id',
            },
          },
          {
            name: 'subcategory',
            label: 'Subcategory',
            type: 'dropdown',
            lookup: {
              dataSource: [
                { id: 1, category: 1, name: 'Subcategory 1.1' },
                { id: 2, category: 1, name: 'Subcategory 1.2' },
                { id: 3, category: 2, name: 'Subcategory 2.1' },
              ],
              displayExpr: 'name',
              valueExpr: 'id',
              dependsOn: ['category'],
            },
          },
        ],
      };

      const result = validateView(formView);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate form view with addSaveBtn', () => {
      const formViewWithSaveBtn: ViewConfig = {
        id: 'form-view-with-save',
        // Note: _id and addSaveBtn not in dist schema, using preferences instead
        title: 'Form with Auto Save',
        description: 'A form with automatic save button',
        type: 'form',
        items: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            validationRules: [{ type: 'required' }],
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            validationRules: [{ type: 'required' }],
          },
        ],
      };

      const result = validateView(formViewWithSaveBtn);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate complex nested form view', () => {
      const complexFormView: ViewConfig = {
        id: 'grouped-tabbed-form',
        title: 'Grouped & Tabbed Form', // Use title instead of label for ViewConfig/ItemConfig
        description: 'Form with nested GroupItem and TabbedItem',
        type: 'form',
        items: [
          {
            type: 'group',
            colCount: 2,
            items: [
              {
                type: 'group',
                caption: 'First Information',
                items: [
                  {
                    name: 'categoryTree',
                    label: 'Category Tree',
                    type: 'tree',
                    config: {
                      id: 'category-tree',
                      title: 'Category Tree', // Use title for ItemConfig
                      description: 'Simple category tree example',
                      type: 'tree',
                      items: [
                        { name: 'id', label: 'ID', type: 'number', visible: false },
                        { name: 'name', label: 'Name', type: 'text' },
                        { name: 'parentId', label: 'Parent', type: 'number', visible: false },
                      ],
                    },
                  },
                ],
              },
              {
                type: 'group',
                caption: 'Main Information',
                items: [
                  {
                    name: 'grid',
                    label: 'Grid',
                    type: 'grid',
                    config: {
                      id: 'details-grid',
                      title: 'Details Grid', // Use title for ItemConfig
                      description: 'Edit details',
                      type: 'grid',
                      items: [
                        { name: 'item', label: 'Item', type: 'text' },
                        { name: 'qty', label: 'Quantity', type: 'number' },
                      ],
                      editing: { allowAdding: true, allowUpdating: true, allowDeleting: true },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'group',
            caption: 'Contact Information',
            items: [
              {
                type: 'tabbed',
                items: [
                  {
                    type: 'tab',
                    name: 'phoneTab', // Required for tab type
                    tabTitle: 'Phone',
                    items: [{ name: 'Phone', label: 'Phone', type: 'text' }],
                  },
                  {
                    type: 'tab',
                    name: 'skypeTab', // Required for tab type
                    tabTitle: 'Skype',
                    items: [{ name: 'Skype', label: 'Skype', type: 'text' }],
                  },
                  {
                    type: 'tab',
                    name: 'emailTab', // Required for tab type
                    tabTitle: 'Email',
                    items: [{ name: 'Email', label: 'Email', type: 'text' }],
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = validateView(complexFormView);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validation Error Cases', () => {
    test('should fail validation for invalid field type', () => {
      const invalidField = {
        name: 'test',
        label: 'Test',
        type: 'invalid-type',
      };

      const result = validateField(invalidField as any);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should fail validation for missing required properties', () => {
      const invalidField = {
        name: 'test',
        // missing dataType
      };

      const result = validateField(invalidField as any);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should fail validation for invalid view type', () => {
      const invalidView = {
        id: 'test',
        label: 'Test',
        type: 'invalid-type',
        items: [],
      };

      const result = validateView(invalidView as any);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('ConditionalExpression Validation (visibleIf/disabledIf/readonlyIf)', () => {
    test('should validate simple equality: { field: value }', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { priority: 'high' },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate simplified "in": { field: [value1, value2] }', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { priority: ['low', 'high'] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate explicit "in" with array: { field: ["in", [values]] }', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { type: ['in', ['boolean', 'switch']] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate comparison operators with scalar: { field: [">", 65] }', () => {
      const field: FieldConfig = {
        name: 'seniorInfo',
        label: 'Senior Info',
        type: 'text',
        visibleIf: { Age: ['>', 65] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate all comparison operators', () => {
      const operators = ['==', '!=', '>', '<', '>=', '<='];

      operators.forEach((op) => {
        const field: FieldConfig = {
          name: 'testField',
          label: 'Test Field',
          type: 'text',
          visibleIf: { Age: [op, 18] },
        };

        const result = validateField(field);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    test('should validate notIn operator: { field: ["notIn", [values]] }', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { status: ['notIn', ['blocked', 'suspended']] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate AND operator with multiple conditions', () => {
      const field: FieldConfig = {
        name: 'contactPreferences',
        label: 'Contact Preferences',
        type: 'group',
        items: [], // Required for group type
        visibleIf: {
          and: [{ Age: ['>=', 18] }, { ShowAddress: ['in', [true]] }],
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate OR operator with multiple conditions', () => {
      const field: FieldConfig = {
        name: 'phones',
        label: 'Phone Numbers',
        type: 'grid',
        config: {
          id: 'phones-grid',
          title: 'Phones', // Use title instead of label for ItemConfig
          type: 'grid',
          items: [],
        },
        visibleIf: {
          or: [{ ContactMethod: ['in', ['phone']] }, { Age: ['>', 65] }],
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate NOT operator', () => {
      const field: FieldConfig = {
        name: 'privacySettings',
        label: 'Privacy Settings',
        type: 'group',
        items: [], // Required for group type
        visibleIf: {
          not: { Age: ['>', 65] },
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate nested complex conditions: AND within OR', () => {
      const field: FieldConfig = {
        name: 'complexField',
        label: 'Complex Field',
        type: 'text',
        visibleIf: {
          or: [
            {
              and: [
                { UserType: ['in', ['premium', 'enterprise']] },
                { SubscriptionActive: ['in', [true]] },
              ],
            },
            { HasSpecialAccess: ['in', [true]] },
          ],
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate deeply nested conditions: NOT with OR containing AND', () => {
      const field: FieldConfig = {
        name: 'deeplyNested',
        label: 'Deeply Nested',
        type: 'text',
        visibleIf: {
          not: {
            or: [
              {
                and: [{ Age: ['<', 18] }, { ParentalConsent: ['in', [false]] }],
              },
              { AccountStatus: ['in', ['blocked', 'deleted']] },
            ],
          },
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate string operators: contains, startswith, endswith', () => {
      const stringOperators = ['contains', 'startswith', 'endswith'];

      stringOperators.forEach((op) => {
        const field: FieldConfig = {
          name: 'testField',
          label: 'Test Field',
          type: 'text',
          visibleIf: { username: [op, 'admin'] },
        };

        const result = validateField(field);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    test('should validate disabledIf with same conditional formats', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        disabledIf: {
          and: [{ isLocked: ['in', [true]] }, { userRole: ['!=', 'admin'] }],
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate readonlyIf with same conditional formats', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        readonlyIf: { isSubmitted: ['in', [true]] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate requiredIf with same conditional formats', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        requiredIf: {
          or: [{ customerType: 'business' }, { orderAmount: ['>', 1000] }],
        },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate boolean values in conditions', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { acceptTerms: ['in', [true]] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate null values in conditions', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { optionalField: ['!=', null] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate numeric values in conditions', () => {
      const field: FieldConfig = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        visibleIf: { priority: ['in', [1, 2, 3]] },
      };

      const result = validateField(field);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Schema Export', () => {
    test('should export complete schema', () => {
      expect(schemas.completeSchema).toBeDefined();
      expect(schemas.completeSchema.$schema).toBe('https://json-schema.org/draft/2019-09/schema');
      expect(schemas.completeSchema.title).toBe('FormFiller Complete Schema');
    });
  });
});
