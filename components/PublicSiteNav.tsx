import { BrandLogo } from "@/components/BrandLogo";
import { PublicNavActions } from "@/components/PublicNavActions";

export function PublicSiteNav() {
  return (
    <nav className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
      <BrandLogo href="/" imageClassName="h-9 w-9" tagline="" />
      <PublicNavActions hideTemplatesOnMobile />
    </nav>
  );
}
