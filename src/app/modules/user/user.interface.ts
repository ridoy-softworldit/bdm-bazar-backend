import { userRole } from "./user.const";

type TUserRoles =
  | "customer"
  | "vendor"
  | "vendor-staff"
  | "admin"
  | "admin-staff"
  | "super-admin";

type TGender = "male" | "female" | "other";

type TUserStatus = "active" | "inActive" | "banned";

export type TUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: TUserRoles;
  gender?: TGender;
  contactNo?: string;
  bio?: string;
  status?: TUserStatus;
  walletPoint?: number;
  socials?: string[];
  cardInfo?: null;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
};

export type TUserRole = keyof typeof userRole;
