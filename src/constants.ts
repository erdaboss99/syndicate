export const EMAIL_VERIFICATION_TOKEN_EXPIRY = 10; // in minutes

export const PASSWORD_RESET_TOKEN_EXPIRY = 5; // in minutes

export const JWT_TOKEN_EXPIRY = 1; // in days

export const AUTO_APPOINTMENT_GENERATION_KEY = 'AUTO_APPOINTMENT_GENERATION';
export const AUTO_APPOINTMENT_GENERATION_DEFAULT_VALUE = 0; // 0 = off, 1 = on

export const OPENING_HOUR = 8; // in UTC time ( UTC is 1 hour behind Budapest in winter, 2 hours in summer )
export const CLOSING_HOUR = 12; // in UTC time ( UTC is 1 hour behind Budapest in winter, 2 hours in summer )
export const APPOINTMENT_DURATION = 30; // in minutes
export const FURTHEST_APPOINTMENT_DATE = 5; // in days

// API related constants
export const API_ONLY_AUTHENTICATED_ERROR_MESSAGE = 'This feature is only available for authenticated users!';
export const API_FORBIDDEN_ONLY_ADMIN_ROUTE_ERROR_MESSAGE =
	'This feature is only available for  users with admin role!';
export const API_FORBIDDEN_ERROR_CODE = 403;
export const API_AUTHENTICATION_ERROR_CODE = 401;
export const API_SUCCESSFUL_MODIFICATION_CODE = 201;
export const API_SUCCESSFUL_REQUEST_CODE = 200;

// DateTime related constants
export const DEFAULT_TIMEZONE = 'Europe/Budapest';

export const NAME_VALIDATION = 'Name is required!';
export const EMAIL_VALIDATION = 'Email should be a valid email address!';
export const PASSWORD_VALIDATION = 'Password is required!';
export const PASSWORD_MIN_VALIDATION = 'Password should be at least 6 characters!';
export const PASSWORD_MAX_VALIDATION = 'Password should be maximum of 25 characters!';
export const PASSWORD_MATCH_VALIDATION = 'Passwords do not match!';
export const PASSWORD_SAME_VALIDATION = 'New password cannot be the same as the old password!';
export const UUID_VALIDATION = 'Invalid UUID!';
export const DATE_REQUIRED_VALIDATION = 'Date is required!';
export const DATE_YYYY_MM_DD_FORMAT_VALIDATION = 'Date should be in yyyy-MM-dd format!';
export const BOOKING_DESCRIPTION_MIN_VALIDATION = 'Booking description should be at least 5 characters!';
export const BOOKING_DESCRIPTION_MAX_VALIDATION = 'Booking description should be maximum of 55 characters!';
export const ISSUE_DESCRIPTION_MIN_VALIDATION = 'Issue description should be at least 5 characters!';
export const ISSUE_DESCRIPTION_MAX_VALIDATION = 'Issue description should be maximum of 55 characters!';
export const ISSUE_SELECTION_REQUIRED_VALIDATION = 'Issue selection is required!';

export const ACTION_REDIRECT_DELAY = 2500; // in milliseconds
export const ACTION_ONLY_ADMIN_ERROR = 'This feature is only available for users with admin role!';
export const ACTION_ONLY_AUTHENTICATED_ERROR = 'This feature is only available for authenticated users!';
export const ACTION_DEFAULT_ERROR = 'Something went wrong! Please try again later!';
export const ACTION_INVALID_PAYLOAD_ERROR = 'Invalid data!';

export const ACTION_INVALID_TOKEN_ERROR = 'Invalid token!';
export const ACTION_NON_EXISTING_TOKEN_ERROR = 'Token does not exist!';
export const ACTION_EXPIRED_TOKEN_ERROR = 'Token has expired!';

export const ACTION_LOGIN_INVALID_CREDENTIALS_ERROR = 'Invalid credentials!';
export const ACTION_LOGIN_INVALID_EMAIL_OR_PASSWORD_ERROR = 'Invalid email or password!';

export const ACTION_CONFIRMATION_EMAIL_SENT_SUCCESS = 'Confirmation email sent!';

export const ACTION_PASSWORD_RESET_EMAIL_SENT_SUCCESS = 'Password reset email sent!';

export const ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR =
	'User data cannot be changed in accounts created using a third-party provider!';
export const ACTION_ACCOUNT_NOT_FOUND_ERROR = 'User no longer exists!';
export const ACTION_ACCOUNT_WITH_EMAIL_NOT_FOUND_ERROR = 'Account with this email does not exist!';
export const ACTION_ACCOUNT_INCORRECT_PASSWORD_ERROR = 'Incorrect password!';
export const ACTION_ACCOUNT_INCORRECT_EMAIL_ERROR = 'Incorrect email!';
export const ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR = 'This email is already taken!';
export const ACTION_ACCOUNT_EMAIL_VERIFIED_SUCCESS = 'Email successfully verified!';
export const ACTION_ACCOUNT_UPDATED_SUCCESS = 'Account successfully updated! Please log in again!';
export const ACTION_ACCOUNT_DELETED_SUCCESS = 'Account successfully deleted!';
export const ACTION_ACCOUNT_ROLE_CHANGE_SUCCESS = 'Role successfully updated!';
export const ACTION_ACCOUNT_PASSWORD_UPDATED_SUCCESS = 'Password successfully updated!';

export const ACTION_APPOINTMENT_AUTO_GENERATION_ENABLED_SUCCESS = 'Auto appointment generation successfully enabled!';
export const ACTION_APPOINTMENT_AUTO_GENERATION_DISABLED_SUCCESS = 'Auto appointment generation successfully disabled!';

export const ACTION_ISSUE_NOT_FOUND_ERROR = 'Issue not found!';
export const ACTION_ISSUE_CREATED_SUCCESS = 'Issue successfully created!';
export const ACTION_ISSUE_UPDATED_SUCCESS = 'Issue successfully updated!';
export const ACTION_ISSUE_DELETED_SUCCESS = 'Issue successfully deleted!';
export const ACTION_ISSUE_DELETE_LINKED_BOOKING_ERROR = 'Issue has linked bookings, therefore cannot be deleted!';
