import { useState } from 'react';
import { Sidebar } from '@/components/utils/SideBar';
import { Camera, UserPen } from 'lucide-react';
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
import avatar from '../../../public/assets/avatar.jpg';

// Static data
const staticProfileData = {
  name: 'Ipsita Mohanty',
  email: 'ipsita@gmail.com',
  memberSince: 'Feb 2026',
  accountType: 'Premium Account',
  weight: '55',
  height: '182',
  dateOfBirth: '2003-11-07',
  gender: 'Female',
};

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: staticProfileData.name,
    email: staticProfileData.email,
    weight: staticProfileData.weight,
    height: staticProfileData.height,
    dateOfBirth: staticProfileData.dateOfBirth,
    gender: staticProfileData.gender,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    // API call would go here
  };

  const handleDiscard = () => {
    setFormData({
      name: staticProfileData.name,
      email: staticProfileData.email,
      weight: staticProfileData.weight,
      height: staticProfileData.height,
      dateOfBirth: staticProfileData.dateOfBirth,
      gender: staticProfileData.gender,
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Sidebar />

      <main className="grow h-full overflow-y-auto p-8 lg:p-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-10 p-8 rounded-2xl border border-border-light shadow-emerald-300">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-none shadow-xl bg-background-light"
                src={avatar}
              />
              <button className="absolute -bottom-2 -right-2 p-2 rounded-lg shadow-lg hover:scale-105 transition-transform bg-primary text-muted-foreground cursor-pointer">
                <Camera size={16} />
              </button>
            </div>

            <div>
              {/* Name and Email section */}
              <h2 className="text-3xl font-bold text-primary-foreground">
                {staticProfileData.name}
              </h2>
              <p className="text-muted-foreground text-xs">
                {staticProfileData.email} • Member since {staticProfileData.memberSince}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-wider bg-primary/10 text-primary border-primary/50">
                  {staticProfileData.accountType}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-6.5 rounded-xl bg-muted border-border-light"
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
                  <Label className="block text-sm font-semibold mb-2 text-foreground">
                    Date of Birth
                  </Label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
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
              </div>
            </div>
          </div>

          {/* Daily Motivation Card */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-accent-foreground text-accent">
              <h3 className="font-bold text-lg mb-4">Daily Motivation</h3>
              <p className="text-sm opacity-80 italic">
                "Consistency is the key to unlocking your true potential. Keep pushing, Ipsita!"{' '}
                {/* the last name should be api fetched */}
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
