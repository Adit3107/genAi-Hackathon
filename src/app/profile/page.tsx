import { ProfileForm } from './profile-form';

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 mb-8 text-center">
            <h1 className="text-3xl font-bold font-headline">Your Professional Profile</h1>
            <p className="text-muted-foreground">Keep your profile updated to receive the best career recommendations.</p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}
