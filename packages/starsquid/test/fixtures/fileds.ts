import type { SquidexField } from "../../src/data/models/data-schema";

// schema-test
export const squidexFieldFixtures: Record<string, SquidexField> = {
  Array: {
    name: "Array",
    properties: {
      isRequired: false,
      fieldType: "Array",
    },
    nested: [
      {
        name: "name",
        properties: {
          isRequired: false,
          fieldType: "String",
        }
      },
      {
        name: "otherschema",
        properties: {
          isRequired: false,
          fieldType: "References",
        }
      }
    ]
  },
  Assets: {
    name: "Images",
    properties: {
      isRequired: false,
      fieldType: "Assets",
    }
  },
  Boolean: {
    name: "Exist",
    properties: {
      isRequired: false,
      fieldType: "Boolean",
    }
  },
  Component: {
    name: "Button",
    properties: {
      isRequired: false,
      fieldType: "Component",
      schemaIds: ["55b0700e-175c-4fca-bf60-7b0f3a1519e2"]
    }
  },
  ComponentSelect: {
    name: "Select",
    properties: {
      isRequired: false,
      fieldType: "Component",
      schemaIds: ["84b533dc-d908-4ef8-979a-28f77ed592f0", "55b0700e-175c-4fca-bf60-7b0f3a1519e2"]
    }
  },
  Components: {
    name: "List",
    properties: {
      isRequired: false,
      fieldType: "Components",
      schemaIds: ["84b533dc-d908-4ef8-979a-28f77ed592f0"]
    }
  },
  ComponentsSelect: {
    name: "SelectList",
    properties: {
      isRequired: false,
      fieldType: "Components",
      schemaIds: ["84b533dc-d908-4ef8-979a-28f77ed592f0", "55b0700e-175c-4fca-bf60-7b0f3a1519e2"]
    }
  },
  EmptyComponent: {
    name: "Undefined",
    properties: {
      isRequired: false,
      fieldType: "Component",
    }
  },
  DateTime: {
    name: "PublishDate",
    properties: {
      isRequired: false,
      fieldType: "DateTime",
    }
  },
  Geolocation: {
    name: "Location",
    properties: {
      isRequired: false,
      fieldType: "Geolocation",
    }
  },
  Json: {
    name: "DynamicContent",
    properties: {
      isRequired: false,
      fieldType: "Json",
    }
  },
  Number: {
    name: "Age",
    properties: {
      isRequired: false,
      fieldType: "Number",
    }
  },
  References: {
    name: "NavationProperty",
    properties: {
      isRequired: false,
      fieldType: "References",
    }
  },
  RichText: {
    name: "Content",
    properties: {
      isRequired: false,
      fieldType: "RichText",
    }
  },
  String: {
    name: "Name",
    properties: {
      isRequired: true,
      fieldType: "String",
      editor: "Input",
    }
  },
  Tags: {
    name: "Tags",
    properties: {
      isRequired: false,
      fieldType: "Tags",
    }
  },
  UI: {
    name: "UI",
    properties: {
      isRequired: false,
      fieldType: "UI",
    }
  }
}
