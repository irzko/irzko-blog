import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Fieldset, Input } from "@chakra-ui/react";
import React from "react";

export default function LoginPage() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <Fieldset.Root maxWidth={400}>
        <Fieldset.Content>
          <Field label="Tên người dùng">
            <Input name="username" />
          </Field>
          <Field label="Mật khẩu">
            <Input name="password" type="password" />
          </Field>
          <Button type="submit">Đăng nhập</Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}
