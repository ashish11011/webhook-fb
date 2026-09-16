import { Router } from "express";
import { createTenant, deleteTenant, generateTenantBearerToken, getTenant, listTenants, updateTenant, } from "../controllers/tenants.controller.js";
import { deleteSalesforceConnect, deleteWhatsappConnect, getSalesforceConnect, getWhatsappConnect, saveSalesforceConnect, saveWhatsappConnect, } from "../controllers/connections.controller.js";
const router = Router();
router.get("/", listTenants);
router.post("/", createTenant);
router.get("/:tenantId", getTenant);
router.put("/:tenantId", updateTenant);
router.put("/:tenantId/bearer-token", generateTenantBearerToken);
router.delete("/:tenantId", deleteTenant);
router.get("/:tenantId/salesforce-connect", getSalesforceConnect);
router.put("/:tenantId/salesforce-connect", saveSalesforceConnect);
router.delete("/:tenantId/salesforce-connect", deleteSalesforceConnect);
router.get("/:tenantId/whatsapp-connect", getWhatsappConnect);
router.put("/:tenantId/whatsapp-connect", saveWhatsappConnect);
router.delete("/:tenantId/whatsapp-connect", deleteWhatsappConnect);
export default router;
//# sourceMappingURL=tenants.routes.js.map