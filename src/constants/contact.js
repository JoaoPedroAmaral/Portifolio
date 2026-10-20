import { SOCIAL } from './site'

export const CONTACT_CHANNELS = [
  { id: 'email', icon: 'mail', value: SOCIAL.email, href: `mailto:${SOCIAL.email}`, external: false },
  { id: 'linkedin', icon: 'linkedin', value: 'joaopedroamaralrosa', href: SOCIAL.linkedin, external: true },
  { id: 'github', icon: 'github', value: 'JoaoPedroAmaral', href: SOCIAL.github, external: true },
  { id: 'phone', icon: 'phone', value: SOCIAL.phone, href: SOCIAL.phoneHref, external: false },
  { id: 'lattes', icon: 'graduation', value: null, href: SOCIAL.lattes, external: true },
]
