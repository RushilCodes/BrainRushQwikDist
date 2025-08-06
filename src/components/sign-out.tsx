import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useSignOut } from "../routes/plugin@auth";

export default component$(() => {
  const signOutSig = useSignOut();

  return (
    <>
      {/* server-side with Form action */}
      <Form action={signOutSig}>
        <input type="hidden" name="redirectTo" value="/" />
        <button>Sign Out</button>
      </Form>

      {/* submit method */}
      <Link onClick$={() => signOutSig.submit({ redirectTo: "/" })}>
        SignIn
      </Link>
    </>
  );
});
