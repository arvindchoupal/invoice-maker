import { BrandLogo } from "@/components/BrandLogo";
import { PublicHeaderActions } from "@/components/PublicHeaderActions";
import { PublicMegaMenu } from "@/components/PublicMegaMenu";

export function PublicSiteNav() {
  return (
    <nav aria-label="Primary navigation" className="flex h-full min-w-0 items-center gap-2 sm:gap-4">
      <BrandLogo className="shrink-0" href="/" imageClassName="h-10 w-[120px]" tagline="" />
      <div className="ml-auto lg:ml-4"><PublicMegaMenu /></div>
      <div className="ml-auto"><PublicHeaderActions /></div>
    </nav>
  );
}
