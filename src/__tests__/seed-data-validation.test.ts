import { validateField, validateView } from '../index.js';
import { FieldConfig, ViewConfig } from '../interfaces/index.js';

// Sample data from seedData.js converted to new schema format
describe('Seed Data Validation Tests', () => {
  describe('Grid View Configuration', () => {
    test('should validate grid view from seed data', () => {
      const gridView: ViewConfig = {
        id: 'grid-view',
        title: 'Grid View',
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
  });

  describe('Tree View Configuration', () => {
    test('should validate tree view from seed data', () => {
      const treeView: ViewConfig = {
        id: 'tree-view',
        title: 'Tree View',
        description: 'A hierarchical data view',
        type: 'tree',
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
            name: 'parentId',
            label: 'Parent',
            type: 'dropdown',
            lookup: {
              dataSource: [
                { id: 1, name: 'Parent 1' },
                { id: 2, name: 'Parent 2' },
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

      const result = validateView(treeView);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Form View Configuration', () => {
    test('should validate form view from seed data', () => {
      const formView: ViewConfig = {
        id: 'form-view',
        title: 'Form View',
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
  });

  describe('Form with Grid Configuration', () => {
    test('should validate form with embedded grid from seed data', () => {
      const formWithGrid: ViewConfig = {
        id: 'form-with-grid',
        title: 'Form with Grid',
        description: 'Form with embedded grid',
        type: 'form',
        items: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            validationRules: [{ type: 'required' }],
          },
          {
            name: 'details',
            label: 'Details',
            type: 'grid',
            config: {
              id: 'details-grid',
              title: 'Details Grid',
              description: 'Edit details',
              type: 'grid',
              items: [
                { name: 'item', label: 'Item', type: 'text' },
                { name: 'qty', label: 'Quantity', type: 'number' },
              ],
              editing: { allowAdding: true, allowUpdating: true, allowDeleting: true },
            },
          },
          {
            name: 'note',
            label: 'Note',
            type: 'text',
            validationRules: [{ type: 'required', message: 'Note is required!' }],
          },
        ],
      };

      const result = validateView(formWithGrid);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Grouped and Tabbed Form Configuration', () => {
    test('should validate grouped and tabbed form from seed data', () => {
      const groupedTabbedForm: ViewConfig = {
        id: 'grouped-tabbed-form',
        title: 'Grouped & Tabbed Form', // Use title for ViewConfig/ItemConfig
        description: 'Form with nested GroupItem and TabbedItem (with tabs)',
        type: 'form',
        items: [
          {
            type: 'group',
            name: 'mainGroup',
            colCount: 2,
            items: [
              {
                type: 'group',
                name: 'firstInfo',
                caption: 'First Information',
                items: [
                  {
                    name: 'categoryTree',
                    label: 'Category Tree', // FieldConfig uses label
                    type: 'tree',
                    config: {
                      id: 'category-tree',
                      title: 'Category Tree', // ItemConfig uses title
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
                name: 'mainInfo',
                caption: 'Main Information',
                items: [
                  {
                    name: 'grid',
                    label: 'Grid',
                    type: 'grid',
                    config: {
                      id: 'details-grid',
                      title: 'Details Grid',
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
            name: 'contactInfo',
            caption: 'Contact Information',
            items: [
              {
                type: 'tabbed',
                name: 'contactTabs',
                items: [
                  {
                    type: 'tab',
                    name: 'phoneTab',
                    tabTitle: 'Phone',
                    items: [{ name: 'Phone', label: 'Phone', type: 'text' }],
                  },
                  {
                    type: 'tab',
                    name: 'skypeTab',
                    tabTitle: 'Skype',
                    items: [{ name: 'Skype', label: 'Skype', type: 'text' }],
                  },
                  {
                    type: 'tab',
                    name: 'emailTab',
                    tabTitle: 'Email',
                    items: [{ name: 'Email', label: 'Email', type: 'text' }],
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = validateView(groupedTabbedForm);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Form Editor Configuration', () => {
    test('should validate form editor from seed data', () => {
      const formEditor: ViewConfig = {
        id: 'form-editor',
        title: 'Form Editor',
        description:
          'Tree-based editor where each node contains form input name, type and configuration',
        type: 'form',
        items: [
          {
            name: 'formFields',
            label: 'Form Fields',
            type: 'tree',
            config: {
              id: 'form-fields-tree',
              title: 'Form Fields Editor',
              description:
                'Here you can specify the form fields, types and configurations to be edited',
              type: 'tree',
              items: [
                { name: 'id', label: 'ID', type: 'number', visible: false },
                {
                  name: 'name',
                  label: 'Field Name',
                  type: 'text',
                  validationRules: [{ type: 'required' }],
                },
                {
                  name: 'type',
                  label: 'Type',
                  type: 'dropdown',
                  lookup: {
                    dataSource: [
                      { id: 'text', name: 'Text' },
                      { id: 'number', name: 'Number' },
                      { id: 'date', name: 'Date' },
                      { id: 'dropdown', name: 'Dropdown' },
                      { id: 'boolean', name: 'Checkbox' },
                      { id: 'group', name: 'Group' },
                      { id: 'tabbed', name: 'Tabs' },
                    ],
                    displayExpr: 'name',
                    valueExpr: 'id',
                  },
                  validationRules: [{ type: 'required' }],
                },
                { name: 'config', label: 'Configuration (JSON)', type: 'text', maxLength: 1000 },
                {
                  name: 'sampleForm',
                  label: 'Sample Embedded Form',
                  type: 'form',
                  config: [
                    {
                      name: 'sampleText',
                      label: 'Sample Text',
                      type: 'text',
                      validationRules: [{ type: 'required' }],
                    },
                    { name: 'sampleNumber', label: 'Sample Number', type: 'number' },
                    {
                      name: 'sampleDropdown',
                      label: 'Sample Dropdown',
                      type: 'dropdown',
                      lookup: {
                        dataSource: [
                          { id: 1, name: 'First' },
                          { id: 2, name: 'Second' },
                        ],
                        displayExpr: 'name',
                        valueExpr: 'id',
                      },
                    },
                  ],
                },
              ],
              editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'popup',
              },
            },
          },
        ],
      };

      const result = validateView(formEditor);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Dynamic Form Demo Configuration', () => {
    test('should validate dynamic form demo from seed data', () => {
      const dynamicFormDemo: ViewConfig = {
        id: 'dynamic-form-demo',
        title: 'Dynamic Form Demo',
        description:
          'Dynamic form with dependent fields and conditional display based on DevExtreme demo',
        type: 'form',
        items: [
          {
            type: 'group',
            name: 'personalData',
            colCount: 2,
            caption: 'Personal Data',
            items: [
              {
                name: 'FirstName',
                label: 'First Name',
                type: 'text',
                validationRules: [{ type: 'required', message: 'First name is required' }],
              },
              {
                name: 'LastName',
                label: 'Last Name',
                type: 'text',
                validationRules: [{ type: 'required', message: 'Last name is required' }],
              },
              {
                name: 'ShowAddress',
                label: 'Show Address',
                type: 'boolean',
                text: 'Show Address', // Direct property
              },
            ],
          },
          {
            type: 'group',
            colCount: 2,
            caption: 'Home Address',
            name: 'HomeAddress',
            visibleIf: { ShowAddress: ['==', true] },
            items: [
              {
                name: 'Address',
                label: 'Address',
                type: 'text',
                validationRules: [{ type: 'required', message: 'Address is required' }],
              },
              {
                name: 'City',
                label: 'City',
                type: 'text',
                validationRules: [{ type: 'required', message: 'City is required' }],
              },
            ],
          },
          {
            type: 'group',
            caption: 'Phones',
            colCount: 2,
            name: 'phones-container',
            items: [
              {
                type: 'group',
                name: 'phones',
                items: [
                  {
                    name: 'Phones[0]',
                    label: 'Phone 1',
                    type: 'text',
                    placeholder: '+1 (X00) 000-0000', // Direct property
                  },
                  {
                    name: 'Phones[1]',
                    label: 'Phone 2',
                    type: 'text',
                    placeholder: '+1 (X00) 000-0000', // Direct property
                  },
                ],
              },
              {
                type: 'button',
                buttonOptions: {
                  icon: 'add',
                  text: 'Add phone',
                  onClick: 'addNewPhone',
                },
              },
            ],
          },
        ],
      };

      const result = validateView(dynamicFormDemo);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Extended Form Editor Configuration', () => {
    test('should validate extended form editor from seed data', () => {
      const extendedFormEditor: ViewConfig = {
        id: 'extended-form-editor',
        title: 'Extended Form Editor',
        description: 'Demonstration of all supported DevExtreme editor types',
        type: 'form',
        items: [
          {
            name: 'name',
            label: 'Form Name',
            type: 'text',
            validationRules: [{ type: 'required', message: 'Name is required!' }],
          },
          {
            name: 'description',
            label: 'Form Description',
            type: 'textarea',
            placeholder: 'Enter form description...', // Direct property
            validationRules: [{ type: 'required', message: 'Description is required!' }],
          },
          {
            name: 'age',
            label: 'Age',
            type: 'number',
            min: 0, // Direct properties
            max: 120,
          },
          {
            name: 'birthDate',
            label: 'Birth Date',
            type: 'date',
          },
          {
            name: 'dateRange',
            label: 'Date Range',
            type: 'daterange',
          },
          {
            name: 'isActive',
            label: 'Active',
            type: 'checkbox',
          },
          {
            name: 'priority',
            label: 'Priority',
            type: 'slider',
            min: 1, // Direct properties
            max: 10,
            step: 1,
          },
          {
            name: 'rating',
            label: 'Rating',
            type: 'rangeslider',
            min: 0,
            max: 5,
            step: 0.5,
          },
          {
            name: 'color',
            label: 'Color',
            type: 'colorbox',
          },
          {
            name: 'category',
            label: 'Category',
            type: 'dropdown',
            lookup: {
              dataSource: [
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' },
                { id: 3, name: 'Category 3' },
              ],
              displayExpr: 'name',
              valueExpr: 'id',
            },
          },
          {
            name: 'tags',
            label: 'Tags',
            type: 'tagbox',
            lookup: {
              dataSource: ['React', 'TypeScript', 'DevExtreme', 'Form', 'Validation'],
            },
          },
          {
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
          },
          {
            name: 'notifications',
            label: 'Notifications',
            type: 'switch',
          },
          {
            name: 'content',
            label: 'Content',
            type: 'htmleditor',
            height: 200, // Direct property
          },
        ],
      };

      const result = validateView(extendedFormEditor);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('DevExtreme Tree/Grid Properties', () => {
    test('should validate tree config with DevExtreme display properties', () => {
      const treeWithDevExtremeProps: ViewConfig = {
        id: 'tree-with-dx-props',
        title: 'Tree with DevExtreme Properties',
        type: 'tree',
        items: [
          {
            name: 'id',
            label: 'ID',
            type: 'number',
            allowEditing: false,
            allowSorting: true,
          },
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            allowEditing: true,
            allowSorting: true,
            allowFiltering: true,
            validationRules: [{ type: 'required' }],
          },
        ],
        keyExpr: 'id',
        parentIdExpr: 'parentId',
        autoExpandAll: true,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: false,
        allowColumnReordering: true,
        allowColumnResizing: true,
        showColumnHeaders: true,
        editing: {
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
          mode: 'row',
        },
      };

      const result = validateView(treeWithDevExtremeProps);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate group with colCount', () => {
      const formWithGroup: ViewConfig = {
        id: 'form-with-group',
        title: 'Form with Group',
        type: 'form',
        items: [
          {
            type: 'group',
            name: 'personal_info',
            label: 'Personal Information',
            colCount: 2,
            items: [
              {
                name: 'first_name',
                label: 'First Name',
                type: 'text',
              },
              {
                name: 'last_name',
                label: 'Last Name',
                type: 'text',
              },
            ],
          },
        ],
      };

      const result = validateView(formWithGroup);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate group without colCount (should use default)', () => {
      const formWithGroupNoColCount: ViewConfig = {
        id: 'form-with-group-no-colcount',
        title: 'Form with Group (no colCount)',
        type: 'form',
        items: [
          {
            type: 'group',
            name: 'address',
            label: 'Address',
            items: [
              {
                name: 'street',
                label: 'Street',
                type: 'text',
              },
            ],
          },
        ],
      };

      const result = validateView(formWithGroupNoColCount);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
