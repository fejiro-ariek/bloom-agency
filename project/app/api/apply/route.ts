import { NextRequest, NextResponse } from 'next/server';
import { saveApplication } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    const body = await request.json();
    console.log('Request body received:', body);

    // Basic validation
    const requiredFields = ['instagram', 'fullName', 'university', 'degree', 'phone', 'whyYou', 'experience', 'femaleUK', 'privacy'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Check honeypot field (anti-spam)
    if (body.website) {
      console.log('Potential spam detected - honeypot field filled');
      return NextResponse.json({ message: 'Thanks! We\'ll be in touch within 24–48h.' });
    }

    // Instagram handle validation
    if (!body.instagram.startsWith('@') || body.instagram.length < 3 || body.instagram.length > 31) {
      return NextResponse.json(
        { error: 'Invalid Instagram handle format' },
        { status: 400 }
      );
    }

    // UK phone validation
    const phoneRegex = /^07\d{9}$/;
    if (!phoneRegex.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid UK phone number format' },
        { status: 400 }
      );
    }

    // Save to database
    await saveApplication({
      instagram: body.instagram,
      full_name: body.fullName,
      university: body.university,
      degree: body.degree,
      phone: body.phone,
      why_you: body.whyYou,
      experience: body.experience,
      female_uk: body.femaleUK,
      privacy: body.privacy,
    });

    console.log('Application saved to database successfully');

    return NextResponse.json({
      message: 'Thanks! We\'ll be in touch within 24–48h.'
    });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}