import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// En el controlador se pone directo:
// SetMetadata('isPublic', true)
// Estamos simulando este comportamiento creando este decorator
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
