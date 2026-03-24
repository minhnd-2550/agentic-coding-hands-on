import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { WriteKudosProvider } from '@/components/kudos/write/WriteKudosProvider';
import { WriteKudosModal } from '@/components/kudos/write/WriteKudosModal';
import { KudosPageClient } from '@/app/(main)/kudos/KudosPageClient';

/**
 * Preview page for Kudos Live Board — bypasses auth.
 * TODO: Remove before production deployment.
 */
export default function KudosPreviewPage() {
  return (
    <WriteKudosProvider>
      <Header variant="full" />
      <main className="pt-20">
        <KudosPageClient />
      </main>
      <Footer variant="full" />
      <FloatingActionButton />
      <WriteKudosModal />
    </WriteKudosProvider>
  );
}
