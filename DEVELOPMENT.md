# Solimesh - Development Guide

## 🛠️ Development Workflow

### Starting Development
```bash
npm run dev
```
Open http://localhost:3000

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 📝 Code Organization

### Pages (`/app`)
- Each page is a route
- All pages are client-side (`'use client'`)
- Pages handle routing and layout
- Use hooks for data fetching

### Hooks (`/hooks`)
- `useAuth()`: Get current user and auth state
- `usePantry(userId)`: CRUD operations for pantry items
- `useContacts(userId)`: CRUD operations for contacts

### Stores (`/store`)
- `useAuthStore`: User authentication state
- `useUIStore`: Accessibility and UI preferences
- `useMeshStore`: Abundance signals state

### Libraries (`/lib`)
- `supabase.ts`: Supabase client (lazy-loaded)
- `gemini.ts`: Gemini API integration
- `utils.ts`: Helper functions

### Types (`/types`)
- All TypeScript interfaces defined here
- Import types from `@/types`

---

## 🔄 Data Flow

### Authentication Flow
```
Login Page → supabase.auth.signInWithPassword()
  ↓
useAuth hook detects session change
  ↓
useAuthStore updates user state
  ↓
Protected pages redirect to /auth/login if no user
```

### Pantry Data Flow
```
Scanner Page → extractFoodItems(image)
  ↓
Gemini API extracts items
  ↓
User clicks "Add" → usePantry.addItem()
  ↓
Supabase inserts into pantry_items table
  ↓
TanStack Query invalidates cache
  ↓
Pantry Page re-fetches and displays items
```

### Real-time Mesh Flow
```
Mesh Page → handleCreateSignal()
  ↓
Insert into abundance_signals table
  ↓
Supabase Realtime broadcasts change
  ↓
Other users' Mesh pages receive update
  ↓
useMeshStore.addSignal() updates state
  ↓
UI re-renders with new signal
```

---

## 🎨 Styling

### Tailwind CSS
- All styling uses Tailwind classes
- Custom colors defined in `tailwind.config.js`:
  - `primary`: #10b981 (green)
  - `secondary`: #8b5cf6 (purple)

### Accessibility Classes
- `.low-stimulation`: Monochromatic, no animations
- `.high-contrast`: Black background, white text
- `.text-small`, `.text-large`: Font size variants

### Responsive Design
- Mobile-first approach
- Use `md:` prefix for tablet/desktop
- Touch targets minimum 44x44px

---

## 🔌 API Integration

### Supabase
```typescript
import { supabase } from '@/lib/supabase';

// Query
const { data, error } = await supabase
  .from('pantry_items')
  .select('*')
  .eq('user_id', userId);

// Insert
const { data, error } = await supabase
  .from('pantry_items')
  .insert([item])
  .select();

// Update
const { data, error } = await supabase
  .from('support_contacts')
  .update({ last_contact_date: new Date().toISOString() })
  .eq('id', contactId);

// Delete
const { error } = await supabase
  .from('pantry_items')
  .delete()
  .eq('id', itemId);

// Real-time subscription
const subscription = supabase
  .channel('abundance_signals')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'abundance_signals' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

### Gemini API
```typescript
import { extractFoodItems } from '@/lib/gemini';

const items = await extractFoodItems(imageBase64);
// Returns: ['tomato', 'lettuce', 'carrot']
```

---

## 🧪 Testing

### Manual Testing Checklist
1. **Auth**
   - [ ] Sign up with new email
   - [ ] Verify email confirmation
   - [ ] Log in with credentials
   - [ ] Log out
   - [ ] Session persists on refresh

2. **Scanner**
   - [ ] Upload image
   - [ ] See preview
   - [ ] Items extracted
   - [ ] Add item to pantry
   - [ ] Item appears in pantry list

3. **Pantry**
   - [ ] View all items
   - [ ] Items sorted by expiry
   - [ ] Expiry colors correct
   - [ ] Delete item
   - [ ] Empty state shows

4. **Contacts**
   - [ ] Add contact
   - [ ] View contact list
   - [ ] Mark as contacted
   - [ ] Health color updates
   - [ ] Delete contact

5. **Mesh**
   - [ ] Create signal
   - [ ] Signal appears in list
   - [ ] Stress level updates
   - [ ] Real-time updates work

6. **Settings**
   - [ ] Toggle low-stimulation
   - [ ] Toggle high contrast
   - [ ] Change font size
   - [ ] Toggle reduced motion
   - [ ] Settings persist

---

## 🐛 Debugging

### Browser DevTools
- **Console**: Check for errors
- **Network**: Monitor API calls
- **Application**: Check localStorage
- **Performance**: Profile slow pages

### Supabase Dashboard
- Monitor database queries
- Check RLS policies
- View real-time events
- Check auth logs

### Common Issues

**"Supabase not initialized"**
- Ensure `.env.local` has correct keys
- Restart dev server after changing env vars
- Check that page has `'use client'` directive

**"User not authenticated"**
- Check Supabase auth settings
- Verify email confirmation enabled
- Check RLS policies allow user access

**"Items not appearing"**
- Check Supabase dashboard for data
- Verify RLS policies
- Check browser console for errors
- Try invalidating React Query cache

**"Real-time not working"**
- Check Supabase Realtime enabled
- Verify subscription channel name
- Check browser console for errors

---

## 📦 Adding Dependencies

```bash
npm install package-name
```

Update `package.json` and commit changes.

### Current Dependencies
- `react`: UI library
- `next`: Framework
- `@supabase/supabase-js`: Backend
- `@tanstack/react-query`: Data fetching
- `zustand`: State management
- `tailwindcss`: Styling
- `typescript`: Type safety

---

## 🚀 Performance Tips

1. **Image Optimization**
   - Compress images before upload
   - Use WebP format when possible
   - Lazy load images

2. **Database Queries**
   - Use `.select()` to limit columns
   - Add `.order()` for sorting
   - Use `.limit()` for pagination

3. **State Management**
   - Keep state as local as possible
   - Use Zustand for global state only
   - Avoid unnecessary re-renders

4. **Bundle Size**
   - Check bundle with `npm run build`
   - Use dynamic imports for large components
   - Tree-shake unused code

---

## 📚 File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Components**: PascalCase (e.g., `Scanner.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `authStore.ts`)
- **Types**: PascalCase (e.g., `PantryItem`)
- **Utils**: camelCase (e.g., `formatDate.ts`)

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`**
   - Use `.env.local.example` as template
   - Add `.env.local` to `.gitignore`

2. **Validate user input**
   - Check email format
   - Validate password strength
   - Sanitize text inputs

3. **Use RLS policies**
   - Enforce at database level
   - Don't rely on frontend validation
   - Test policies thoroughly

4. **Handle errors gracefully**
   - Show user-friendly messages
   - Log errors for debugging
   - Don't expose sensitive info

---

## 🎯 Next Development Tasks

1. **Geolocation**
   - Add location permission request
   - Store user location
   - Filter signals by distance

2. **Notifications**
   - Request notification permission
   - Send push notifications
   - Handle notification clicks

3. **Offline Support**
   - Implement sync queue
   - Cache data locally
   - Handle conflicts

4. **Analytics**
   - Track user actions
   - Monitor performance
   - Measure engagement

---

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 💡 Tips & Tricks

### Quick Restart
```bash
# Kill dev server and restart
Ctrl+C
npm run dev
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Check Types
```bash
npx tsc --noEmit
```

### Format Code
```bash
npx prettier --write .
```

---

## 🤝 Code Review Checklist

Before committing:
- [ ] Code follows project style
- [ ] No console.log() left in code
- [ ] TypeScript types are correct
- [ ] No unused imports
- [ ] Error handling implemented
- [ ] Accessibility considered
- [ ] Mobile responsive
- [ ] Performance optimized

---

Happy coding! 🚀
