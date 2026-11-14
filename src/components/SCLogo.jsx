import React from 'react';
import { OfficialLogo } from './OfficialLogo';

/**
 * Re-export OfficialLogo as SCLogo for backward compatibility across all imports
 * completely replacing the old monogram with the official Scales of Justice,
 * Law Book & Gavel, and Golden Laurel Wreath insignia.
 */
export const SCLogo = (props) => <OfficialLogo {...props} />;

export default SCLogo;
