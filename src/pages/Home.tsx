import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  district: z
    .string()
    .trim()
    .min(2, "Please enter your district.")
    .max(100, "District must be 100 characters or fewer."),
});

type FormErrors = Partial<Record<"name" | "district", string>>;

const Home = () => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = contactSchema.safeParse({ name, district });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        district: fieldErrors.district?.[0],
      });
      return;
    }

    setErrors({});
    const message = `Hi Ziaur Rahman Shahin. I am ${result.data.name} from ${result.data.district}. You can save my contact.`;
    window.open(`https://wa.me/919365248667?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-muted px-4 py-8 sm:py-14 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl sm:p-8"
      >
        <div className="mb-7 border-l-4 border-primary bg-accent px-4 py-4">
          <p className="text-sm leading-6 text-foreground sm:text-base">
            Please fill out this form and send. I am taking this data to save your contact number. I want to connect with you all. Congratulations for your selection in MBBS. Wish you a wonderful life ahead.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Enter your full name"
              className="h-12 rounded-lg"
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="district" className="mb-2 block text-sm font-semibold text-foreground">
              District
            </label>
            <Input
              id="district"
              name="district"
              type="text"
              autoComplete="address-level2"
              maxLength={100}
              value={district}
              onChange={(event) => {
                setDistrict(event.target.value);
                if (errors.district) setErrors((current) => ({ ...current, district: undefined }));
              }}
              aria-invalid={Boolean(errors.district)}
              aria-describedby={errors.district ? "district-error" : undefined}
              placeholder="Enter your district"
              className="h-12 rounded-lg"
            />
            {errors.district && (
              <p id="district-error" className="mt-1.5 text-sm text-destructive">
                {errors.district}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-7 w-full rounded-lg font-bold">
          <MessageCircle aria-hidden="true" />
          Send
        </Button>
      </form>
    </main>
  );
};

export default Home;
