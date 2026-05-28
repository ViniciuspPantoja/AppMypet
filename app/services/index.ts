import appointmentService from "./appointment.service";
import authService from "./auth.service";
import estoqueService from "./estoque.service";
import notificationsService from "./notifications.service";
import profileService from "./profile.service";

const services = {
  authService,
  profileService,
  appointmentService,
  estoqueService,
  notificationsService,
};

export default services;
