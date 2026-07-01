import React from 'react';
import '../lib/imageSlot.js';

/**
 * Thin React wrapper around the <image-slot> web component (registered for
 * side effects in lib/imageSlot.js). Most slots are authored inline in the
 * section markup; use this when mounting one from JSX.
 */
export default function ImageSlot({ id, src, shape = 'rect', radius, placeholder, style, className }) {
  return React.createElement('image-slot', {
    id, src, shape, radius, placeholder, style, className,
  });
}
