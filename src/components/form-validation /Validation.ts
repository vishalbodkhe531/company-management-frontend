import z from "zod";

export const adminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .optional(),

  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .optional(),

  gender: z
    .enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    })
    .optional(),
});

export const applyProjectSchema = z.object({
  email: z.string().trim().email("Invalid email address"),

  firstName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long"),

  lastName: z.string().trim().min(2, "Name must be at least 2 characters long"),

  projectTitle: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long"),

  phoneNo: z
    .string()
    .trim()
    .regex(/^\+?\d{7,15}$/, "Invalid phone number"),

  resignationDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use 'YYYY-MM-DD'.")
    .refine(
      (date) => new Date(date) < new Date(),
      "Resignation date cannot be in the feature"
    ),

  address: z.string().min(5, "Name must be at least 4 characters long").trim(),

  department: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .trim(),

  gender: z
    .enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    })
    .optional(),
});

export const employeeSchema = z.object({
  fullName: z.string().trim().min(1, "Full Name is required"),

  dateOfBirth: z
    .string()
    .trim()
    .refine(
      (date) => new Date(date) < new Date(),
      "Resignation date cannot be in the feature"
    ),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  email: z.string().trim().email("Invalid email address"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits"),

  address: z.string().trim().min(1, "Address is required"),
  employeeId: z.string().trim().min(1, "Employee ID is required"),
  jobTitle: z.string().trim().min(1, "Job Title is required"),
  department: z.enum(["HR", "IT", "Sales", "Finance"], {
    required_error: "Department is required",
  }),

  employmentType: z.enum(["Full-time", "Part-time", "Contract"]),
});