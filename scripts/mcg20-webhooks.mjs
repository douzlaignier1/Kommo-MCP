// MCG-20 (12/09/2026): exercita a tool nova get_webhooks e imprime o inventario de webhooks
// da conta Kommo. Leitura pura (GET /api/v4/webhooks). Nunca imprime o token.
import { KommoAPI } from '../dist/kommo-api.js';

const baseUrl = process.env.KOMMO_BASE_URL || process.env.KOMMO_DOMAIN;
const token = process.env.KOMMO_ACCESS_TOKEN;
if (!baseUrl || !token) {
  console.error('faltou KOMMO_BASE_URL/KOMMO_DOMAIN ou KOMMO_ACCESS_TOKEN no env-file');
  process.exit(1);
}

const api = new KommoAPI({ baseUrl, accessToken: token });
const r = await api.getWebhooks();
const hooks = (r && r._embedded && r._embedded.webhooks) || [];
console.log('webhooks assinados: ' + hooks.length);
for (const h of hooks) {
  console.log('---');
  console.log('id          : ' + h.id);
  console.log('destination : ' + h.destination);
  console.log('disabled    : ' + h.disabled);
  console.log('created_at  : ' + h.created_at);
  console.log('updated_at  : ' + h.updated_at);
  console.log('settings    : ' + JSON.stringify(h.settings));
}
