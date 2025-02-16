import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

//
// 1. Define a generic interface for a setting field
//
interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'custom';
  value?: string;
  onChange?: (value: string) => void;
  customRenderer?: () => React.ReactNode;
}

//
// 2. Render an individual setting item
//
const SettingItem: React.FC<{ field: SettingField }> = ({ field }) => {
  if (field.type === 'custom' && field.customRenderer) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
        </label>
        {field.customRenderer()}
      </div>
    );
  }
  return (
    <div className="mb-4">
      <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <Input
        id={field.key}
        type={field.type}
        value={field.value}
        onChange={(e) => field.onChange && field.onChange(e.target.value)}
      />
    </div>
  );
};

//
// 3. Render a group of settings
//
interface SettingsGroupProps {
  groupName: string;
  fields: SettingField[];
  layout?: 'vertical' | 'horizontal';
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ groupName, fields, layout = 'vertical' }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{groupName}</h3>
      <div className={layout === 'horizontal' ? 'flex gap-4' : 'grid gap-4'}>
        {fields.map((field) => (
          <SettingItem key={field.key} field={field} />
        ))}
      </div>
    </div>
  );
};

//
// 4. Render the complete settings form
//

interface SettingsGroupConfig {
  groupName: string;
  fields: SettingField[];
  layout?: 'vertical' | 'horizontal';
}

interface SettingsFormProps {
  groups: SettingsGroupConfig[];
}

const SettingsForm: React.FC<SettingsFormProps> = ({ groups }) => {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        // Handle saving logic here
      }}
    >
      {groups.map((group) => (
        <SettingsGroup
          key={group.groupName}
          groupName={group.groupName}
          fields={group.fields}
          layout={group.layout}
        />
      ))}
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

//
// 5. Theme switcher component
//
interface ThemeSwitcherProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  return (
    <div className="flex items-center gap-2">
      <span>Light</span>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <span>Dark</span>
    </div>
  );
};

//
// 6. Main Settings component that manages state and configuration
//
const SidebarSettings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  // Initialize theme from sessionStorage or default to 'light'
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light');

  // When the theme changes, update the document's root class and sessionStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Will change for the later implementation from cookies
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Settings configuration makes it easy to add new settings later.
  const settingsConfig: SettingsGroupConfig[] = [
    {
      groupName: 'Credentials',
      fields: [
        { key: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail },
        { key: 'password', label: 'Password', type: 'password', value: password, onChange: setPassword },
      ],
      layout: 'horizontal', // Render side by side
    },
    {
      groupName: 'Account Settings',
      fields: [
        { key: 'username', label: 'Username', type: 'text', value: username, onChange: setUsername },
      ],
    },
    {
      groupName: 'Appearance',
      fields: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'custom',
          customRenderer: () => <ThemeSwitcher theme={theme} setTheme={setTheme} />,
        },
      ],
    },
  ];

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardContent>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <SettingsForm groups={settingsConfig} />
      </CardContent>
    </Card>
  );
};

export default SidebarSettings;
