import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/utils/SideBar';
import { UserPen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import type { Gender } from '@/types/user.types';

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  const updateUser = useUpdateUser();
  const [formData, setFormData] = useState<{
    gender?: Gender;
    name: string;
    weight: string;
    height: string;
    age: string;
  }>({
    name: '',
    weight: '',
    height: '',
    gender: undefined,
    age: '',
  });

  //hydrate from api intially
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? '',
        weight: user.weight?.toString() ?? '',
        height: user.height?.toString() ?? '',
        age: user.age?.toString() ?? '',
        gender: user.gender ?? undefined,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenderChange = (value: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSave = () => {
    updateUser.mutate({
      name: formData.name,
      weight: formData.weight ? Number(formData.weight) : undefined,
      height: formData.height ? Number(formData.height) : undefined,
      gender: formData.gender || undefined,
      age: formData.age ? Number(formData.age) : undefined,
    });
  };

  const handleDiscard = () => {
    if (!user) return;

    setFormData({
      name: user.name ?? '',
      weight: user.weight?.toString() ?? '',
      height: user.height?.toString() ?? '',
      age: user.age?.toString() ?? '',
      gender: user.gender ?? undefined,
    });
  };

  if (isLoading) {
    return <div className="p-10">Loading profile…</div>;
  }

  if (!user || isError) {
    return <div className="p-10">No user data found.</div>;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Sidebar />

      <main className="grow h-full overflow-y-auto p-8 lg:p-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-10 p-8 rounded-2xl border border-border-light shadow-emerald-300">
          <div className="flex items-center gap-6">
            <div>
              {/* Name and Email section */}
              <h2 className="text-3xl font-bold text-primary-foreground">{user.name}</h2>
              <p className="text-muted-foreground text-xs">{user.email} • Member since 2026</p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-wider bg-primary/10 text-primary border-primary/50">
                  PREMIUM ACCOUNT
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}

          <div className="hidden md:flex gap-3 ">
            <Button
              variant="outline"
              onClick={handleDiscard}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
            >
              Discard
            </Button>

            <Button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/70 cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
          <div className="xl:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="p-8 rounded-2xl border bg-card border-border-light">
              <div className="flex items-center gap-2 mb-8">
                <UserPen className="text-primary" size={20} />
                <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">
                    Full Name
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">
                    Email Address
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">
                    Weight (kg)
                  </Label>
                  <Input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">
                    Height (cm)
                  </Label>
                  <Input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">Gender</Label>
                  <Select value={formData.gender} onValueChange={handleGenderChange}>
                    <SelectTrigger className="w-full px-4 py-4 rounded-xl h-auto bg-muted border-border-light">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-semibold mb-2 text-foreground">Age</Label>
                  <Input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Motivation Card */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-accent-foreground text-accent">
              <h3 className="font-bold text-lg mb-4">Daily Motivation</h3>
              <p className="text-sm opacity-80 italic">
                "Consistency is the key to unlocking your true potential. Keep pushing, {user.name}
                !" {/* the last name should be api fetched */}
              </p>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  FitTrack Pro
                </span>
                <span className="opacity-60">"</span>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden space-y-3">
              <Button
                onClick={handleSave}
                className="w-full py-3 rounded-xl font-bold bg-primary text-primary-foreground"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleDiscard}
                className="w-full py-3 rounded-xl font-semibold"
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
