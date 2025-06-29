import SignIn from "@/app/(authentication)/signin/page";
import { providerMap } from "@/auth";

export default function OAuthProviders({
  page,
}: {
  page?: "signin" | "signout";
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 items-center justify-center gap-5">
          <div className="h-[1px] w-full bg-[#EAEAEF]" />
          <h1 className="text-center text-sm text-[#9FA4AA] sm:text-base">
            Or connect with
          </h1>
          <div className="h-[1px] w-full bg-[#EAEAEF]" />
        </div>
      </div>
      <div className="flex w-full justify-between  gap-1 sm:gap-5">
        {Object.values(providerMap).map((provider) => {
          if (provider.id !== "credentials")
            return (
              <form
                className="w-full"
                key={provider.id}
                action={async () => {
                  "use server";
                  SignIn();
                }}
              >
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-[100px] border border-[#ADB5BD] px-2 py-3 text-xs sm:px-5 sm:py-4 sm:text-[15px]"
                >
                  <span className="mr-1 sm:mr-2">LOGO?</span>
                  {` Sign ${page === "signin" ? "in" : "up"} with ${
                    provider.name
                  }`}{" "}
                </button>
              </form>
            );
        })}
      </div>
    </>
  );
}
