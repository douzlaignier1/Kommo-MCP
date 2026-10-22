import type { McpToolDefinition } from './types.js';

const entityTypeProperty = {
  type: 'string',
  enum: ['leads', 'contacts', 'companies'],
  description: 'Tipo da entidade',
};

const paginationProperties = {
  limit: { type: 'number', description: 'Número máximo de registros (padrão: 250)' },
  page: { type: 'number', description: 'Página para paginação (padrão: 1)' },
};

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name: 'get_account',
    title: 'Informações da conta',
    description: 'Obter informações da conta Kommo',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_leads',
    title: 'Listar leads',
    description:
      'Obter lista de leads do Kommo CRM. Por padrão devolve os mais recentes primeiro (created_at desc).',
    inputSchema: {
      type: 'object',
      properties: {
        ...paginationProperties,
        query: { type: 'string', description: 'Filtro de busca (query da API)' },
        order_by: {
          type: 'string',
          enum: ['created_at', 'updated_at', 'id'],
          description: 'Campo de ordenação (padrão: created_at)',
        },
        order_dir: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Direção da ordenação (padrão: desc, mais recentes primeiro)',
        },
        created_from: { type: 'string', description: 'Criado a partir de (YYYY-MM-DD, inclusivo)' },
        created_to: { type: 'string', description: 'Criado até (YYYY-MM-DD, inclusivo)' },
        updated_from: {
          type: 'string',
          description: 'Atualizado a partir de (YYYY-MM-DD, inclusivo)',
        },
        updated_to: { type: 'string', description: 'Atualizado até (YYYY-MM-DD, inclusivo)' },
        pipeline_id: { type: 'number', description: 'Filtrar por funil' },
        status_id: { type: 'number', description: 'Filtrar por etapa (exige pipeline_id)' },
        responsible_user_id: { type: 'number', description: 'Filtrar por usuário responsável' },
        with: {
          type: 'string',
          description: 'Entidades adicionais separadas por vírgula (ex.: contacts)',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_lead',
    title: 'Obter lead',
    description: 'Obter um lead específico pelo ID',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: 'ID do lead' } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'create_lead',
    title: 'Criar lead',
    description: 'Criar um novo lead no Kommo CRM',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nome do lead' },
        price: { type: 'number', description: 'Valor do lead' },
        status_id: { type: 'number', description: 'ID do status' },
        pipeline_id: { type: 'number', description: 'ID do pipeline' },
      },
      required: ['name'],
      additionalProperties: true,
    },
  },
  {
    name: 'update_lead',
    title: 'Atualizar lead',
    description: 'Atualizar um lead existente (nome, valor, status, pipeline, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'ID do lead' },
        name: { type: 'string', description: 'Nome do lead' },
        price: { type: 'number', description: 'Valor do lead' },
        status_id: { type: 'number', description: 'ID do status' },
        pipeline_id: { type: 'number', description: 'ID do pipeline' },
        loss_reason_id: { type: 'number', description: 'ID do motivo de perda' },
      },
      required: ['id'],
      additionalProperties: true,
    },
  },
  {
    name: 'move_lead',
    title: 'Mover lead',
    description: 'Mover lead para outro status ou pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'number', description: 'ID do lead' },
        status_id: { type: 'number', description: 'ID do novo status' },
        pipeline_id: { type: 'number', description: 'ID do novo pipeline (opcional)' },
      },
      required: ['lead_id', 'status_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_pipelines',
    title: 'Listar pipelines',
    description: 'Obter pipelines de vendas e seus status',
    inputSchema: {
      type: 'object',
      properties: {
        pipeline_id: {
          type: 'number',
          description: 'ID do pipeline (opcional, para obter status)',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_sales_report',
    title: 'Relatório de vendas',
    description: 'Obter relatório de vendas do Kommo CRM',
    inputSchema: {
      type: 'object',
      properties: {
        dateFrom: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        dateTo: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_dashboard',
    title: 'Dashboard',
    description: 'Obter dados do dashboard do Kommo CRM',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_contacts',
    title: 'Listar contatos',
    description: 'Obter lista de contatos do Kommo CRM',
    inputSchema: {
      type: 'object',
      properties: paginationProperties,
      additionalProperties: false,
    },
  },
  {
    name: 'get_companies',
    title: 'Listar empresas',
    description: 'Obter lista de empresas do Kommo CRM',
    inputSchema: {
      type: 'object',
      properties: paginationProperties,
      additionalProperties: false,
    },
  },
  {
    name: 'get_tasks',
    title: 'Listar tarefas',
    description: 'Obter lista de tarefas do Kommo CRM',
    inputSchema: {
      type: 'object',
      properties: paginationProperties,
      additionalProperties: false,
    },
  },
  {
    name: 'create_task',
    title: 'Criar tarefa',
    description: 'Criar uma nova tarefa vinculada a lead, contato ou empresa',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Texto da tarefa' },
        entity_id: { type: 'number', description: 'ID da entidade vinculada' },
        entity_type: {
          type: 'string',
          description: 'Tipo da entidade (leads, contacts, companies)',
        },
        complete_till: { type: 'number', description: 'Timestamp Unix de conclusão' },
        responsible_user_id: { type: 'number', description: 'ID do usuário responsável' },
      },
      required: ['text', 'entity_id', 'entity_type', 'complete_till'],
      additionalProperties: true,
    },
  },
  {
    name: 'get_custom_fields',
    title: 'Listar campos personalizados',
    description:
      'Listar as definições de campos personalizados de leads, contatos ou empresas (id, código, tipo e opções de select).',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        ...paginationProperties,
      },
      required: ['entity_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_custom_field_values',
    title: 'Ler campos personalizados de um registro',
    description:
      'Ler os valores dos campos personalizados preenchidos em um lead, contato ou empresa específico.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
      },
      required: ['entity_type', 'entity_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'update_custom_fields',
    title: 'Atualizar campos personalizados',
    description:
      'Gravar valores de campos personalizados em um lead, contato ou empresa. Use value para texto/número/data, enum_id ou enum_code para select, values para o formato cru da API, e value: null para limpar o campo.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
        fields: {
          type: 'array',
          minItems: 1,
          description: 'Campos a gravar',
          items: {
            type: 'object',
            properties: {
              field_id: { type: 'number', description: 'ID do campo' },
              field_code: { type: 'string', description: 'Código do campo (alternativa ao id)' },
              value: {
                type: ['string', 'number', 'boolean', 'null'],
                description: 'Valor simples; null limpa o campo',
              },
              enum_id: { type: 'number', description: 'Opção de select por id' },
              enum_code: { type: 'string', description: 'Opção de select por código' },
              values: {
                type: 'array',
                items: { type: 'object' },
                description: 'Formato cru da API, para tipos que exigem estrutura própria',
              },
            },
            additionalProperties: false,
          },
        },
        confirm: {
          type: 'boolean',
          description: 'Confirma explicitamente a operação de escrita quando exigido.',
        },
      },
      required: ['entity_type', 'entity_id', 'fields'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_events',
    title: 'Histórico de eventos',
    description:
      'Consultar o histórico de eventos do Kommo (mudanças de etapa, campos, tags, notas, responsável), com filtro por entidade, tipo, autor e período.',
    inputSchema: {
      type: 'object',
      properties: {
        ...paginationProperties,
        entity_type: {
          type: 'string',
          enum: ['lead', 'contact', 'company', 'task', 'customer'],
          description: 'Tipo da entidade (singular, como a API de eventos espera)',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
        types: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tipos de evento (ex.: lead_status_changed). Veja get_event_types.',
        },
        created_by: { type: 'number', description: 'Filtrar pelo usuário que gerou o evento' },
        created_from: { type: 'string', description: 'A partir de (YYYY-MM-DD, inclusivo)' },
        created_to: { type: 'string', description: 'Até (YYYY-MM-DD, inclusivo)' },
        order_dir: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Direção da ordenação por data (padrão: desc)',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_event_types',
    title: 'Tipos de evento',
    description:
      'Listar os tipos de evento que a conta registra, para usar no filtro de get_events.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_unsorted',
    title: 'Listar leads não organizados',
    description:
      'Listar a caixa de entrada de leads não organizados (formulários, chats, e-mail, telefonia) ainda não aceitos no funil.',
    inputSchema: {
      type: 'object',
      properties: {
        ...paginationProperties,
        category: {
          type: 'string',
          enum: ['sip', 'mail', 'chats', 'forms'],
          description: 'Filtrar por origem',
        },
        pipeline_id: { type: 'number', description: 'Filtrar por funil de destino' },
        uid: { type: 'string', description: 'Buscar um item específico pelo uid' },
        order_by: {
          type: 'string',
          enum: ['created_at', 'updated_at'],
          description: 'Campo de ordenação (padrão: created_at)',
        },
        order_dir: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Direção da ordenação (padrão: desc)',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_unsorted_summary',
    title: 'Resumo dos não organizados',
    description:
      'Totais da caixa de entrada de não organizados: aceitos, recusados, tempo médio de triagem e quebra por categoria.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_webhooks',
    title: 'Listar webhooks assinados',
    description:
      'Listar os webhooks assinados na conta: id, destination (URL que recebe), settings (eventos assinados), created_at, updated_at e disabled. Serve de inventario: webhook apontando para URL morta aparece aqui.',
    inputSchema: {
      type: 'object',
      properties: {
        destination: {
          type: 'string',
          description: 'Opcional: filtrar por uma URL de destino exata.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_tags',
    title: 'Listar tags',
    description: 'Listar as tags cadastradas na conta para leads, contatos ou empresas.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        ...paginationProperties,
      },
      required: ['entity_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_entity_tags',
    title: 'Ler tags de um registro',
    description: 'Listar as tags aplicadas a um lead, contato ou empresa específico.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
      },
      required: ['entity_type', 'entity_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'add_tags',
    title: 'Adicionar tags',
    description:
      'Adicionar tags a um registro preservando as que já existem. Tags podem ser nomes (criadas se não existirem) ou ids.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
        tags: {
          type: 'array',
          minItems: 1,
          description: 'Tags a adicionar: nomes ou objetos com id/name',
          items: {
            oneOf: [
              { type: 'string' },
              {
                type: 'object',
                properties: { id: { type: 'number' }, name: { type: 'string' } },
                additionalProperties: false,
              },
            ],
          },
        },
        confirm: {
          type: 'boolean',
          description: 'Confirma explicitamente a operação de escrita quando exigido.',
        },
      },
      required: ['entity_type', 'entity_id', 'tags'],
      additionalProperties: false,
    },
  },
  {
    name: 'remove_tags',
    title: 'Remover tags',
    description:
      'Remover tags específicas de um registro, mantendo as demais. Tags podem ser nomes ou ids.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: {
          type: 'string',
          enum: ['leads', 'contacts', 'companies'],
          description: 'Tipo da entidade',
        },
        entity_id: { type: 'number', description: 'ID da entidade' },
        tags: {
          type: 'array',
          minItems: 1,
          description: 'Tags a remover: nomes ou objetos com id/name',
          items: {
            oneOf: [
              { type: 'string' },
              {
                type: 'object',
                properties: { id: { type: 'number' }, name: { type: 'string' } },
                additionalProperties: false,
              },
            ],
          },
        },
        confirm: {
          type: 'boolean',
          description: 'Confirma explicitamente a operação de escrita quando exigido.',
        },
      },
      required: ['entity_type', 'entity_id', 'tags'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_users',
    title: 'Listar usuários',
    description: 'Obter lista de usuários da conta Kommo',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_loss_reasons',
    title: 'Listar motivos de perda',
    description: 'Obter lista de motivos da perda de leads (API 2026)',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_loss_reason',
    title: 'Obter motivo de perda',
    description: 'Obter um motivo de perda específico pelo ID',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: 'ID do motivo de perda' } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_notes',
    title: 'Listar notas',
    description: 'Obter notas de um lead, contato ou empresa',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: entityTypeProperty,
        entity_id: { type: 'number', description: 'ID da entidade' },
        ...paginationProperties,
      },
      required: ['entity_type', 'entity_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'add_note',
    title: 'Adicionar nota',
    description: 'Adicionar uma nota de texto a lead, contato ou empresa',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: entityTypeProperty,
        entity_id: { type: 'number', description: 'ID da entidade' },
        text: { type: 'string', description: 'Texto da nota' },
        note_type: { type: 'string', description: 'Tipo da nota (padrão: common)' },
      },
      required: ['entity_type', 'entity_id', 'text'],
      additionalProperties: false,
    },
  },
  {
    name: 'pin_note',
    title: 'Fixar nota',
    description: 'Fixar uma nota no cartão da entidade (lead, contato ou empresa)',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: entityTypeProperty,
        note_id: { type: 'number', description: 'ID da nota' },
      },
      required: ['entity_type', 'note_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'unpin_note',
    title: 'Desafixar nota',
    description: 'Desafixar uma nota no cartão da entidade',
    inputSchema: {
      type: 'object',
      properties: {
        entity_type: entityTypeProperty,
        note_id: { type: 'number', description: 'ID da nota' },
      },
      required: ['entity_type', 'note_id'],
      additionalProperties: false,
    },
  },
  {
    name: 'run_salesbot',
    title: 'Iniciar Salesbot',
    description: 'Iniciar um Salesbot (API v4). Requer entity_id e entity_type (ex.: leads).',
    inputSchema: {
      type: 'object',
      properties: {
        bot_id: { type: 'number', description: 'ID do Salesbot' },
        entity_id: { type: 'number', description: 'ID da entidade (ex.: lead)' },
        entity_type: { type: 'string', enum: ['leads'], description: 'Tipo da entidade' },
      },
      required: ['bot_id', 'entity_id', 'entity_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'stop_salesbot',
    title: 'Parar Salesbot',
    description: 'Parar um Salesbot pelo ID do bot',
    inputSchema: {
      type: 'object',
      properties: {
        bot_id: { type: 'number', description: 'ID do bot Salesbot' },
        entity_id: { type: 'number', description: 'ID do lead' },
        entity_type: { type: 'string', enum: ['leads'], description: 'Tipo da entidade' },
      },
      required: ['bot_id', 'entity_id', 'entity_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'ask_kommo',
    title: 'Perguntar ao Kommo',
    description: 'Fazer perguntas inteligentes sobre dados do Kommo CRM usando IA conversacional',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'Pergunta sobre dados do Kommo CRM' },
      },
      required: ['question'],
      additionalProperties: false,
    },
  },
];
