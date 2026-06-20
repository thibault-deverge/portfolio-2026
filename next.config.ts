import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Autorise .md/.mdx comme extensions de page reconnues par Next.
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
const withMDX = createMDX()

// On compose les deux plugins : MDX (interne) puis next-intl (externe).
export default withNextIntl(withMDX(nextConfig))
