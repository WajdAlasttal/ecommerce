import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
  create: [roles.User],
  cancel: [roles.User],
  update: [roles.Admin],
};
