# PHONEGUARD AI — starter project

This is a fresh Expo + React Native starter for Android and iPhone.

## Important
This starter is a foundation, not a finished phone-recovery product. It currently includes:
- A basic PHONEGUARD AI screen
- Email OTP sign-in wiring for Supabase (requires configuration)
- A button to request foreground location permission and test the phone's current GPS
- A starter database schema with owner-only Row Level Security policies

It does **not** yet upload live locations, implement reliable background tracking, register multiple devices, or provide a recovery dashboard. Those features need to be built and tested in later steps.

A 30-second background refresh cannot be guaranteed. Android and iOS can delay or suspend background tasks to protect battery and privacy. A powered-off phone cannot send a new location.

## Free-first development
You can start with Expo and a Supabase free project. Free plans have limits and can change. Email authentication may work without paid SMS; phone OTP/SMS usually needs a paid SMS provider. Do not add a bank card or choose a paid plan unless you decide to.

## Requirements
- A computer is recommended for running the Expo development server and building native apps.
- Node.js LTS and npm
- Expo Go on an Android phone for initial preview

An Android phone alone can store and inspect this ZIP, but it cannot conveniently run the complete developer toolchain. We can use a free browser-based coding environment if you do not have a computer.

## Run the starter
1. Extract the ZIP on a computer.
2. Open a terminal in the `phoneguard-ai-starter` folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and add your Supabase project URL and anon key.
5. Run `npx expo start`.
6. Scan the QR code with Expo Go.

## Supabase setup
1. Create a Supabase project.
2. In Authentication, enable Email provider / email OTP.
3. Open SQL Editor and run `supabase/schema.sql`.
4. Copy the Project URL and anon/public key into `.env`.
5. Never put a Supabase service-role key in the mobile app.

## Privacy and release checklist
Before any public launch: add explicit opt-in and clear tracking controls, verify owner authorization, test RLS policies, implement deletion/retention controls, publish a privacy policy, complete security review and abuse monitoring, and meet Google Play / Apple App Store location disclosure rules.
