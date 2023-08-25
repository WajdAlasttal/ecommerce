import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
  create: [roles.User],
  update: [roles.Admin],
  get: [roles.User, roles.Admin],
};
