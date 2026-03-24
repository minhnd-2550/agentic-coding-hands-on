import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { WriteKudosProvider } from "@/components/kudos/write/WriteKudosProvider";
import { WriteKudosModal } from "@/components/kudos/write/WriteKudosModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WriteKudosProvider>
      <Header variant="full" />
      <div className="pt-20">{children}</div>
      <Footer variant="full" />
      <FloatingActionButton />
      <WriteKudosModal />
    </WriteKudosProvider>
  );
}
