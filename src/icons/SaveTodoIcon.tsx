import React from 'react';

interface AddIconProps {
  height: number;
  width: number;
}

function AddIcon(props: AddIconProps) {
  return (
    <svg height={props.height} width={props.width} viewBox="0 0 459 459">
      <path d="M357,0H51C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V102L357,0z M229.5,408
			c-43.35,0-76.5-33.15-76.5-76.5s33.15-76.5,76.5-76.5c43.35,0,76.5,33.15,76.5,76.5S272.85,408,229.5,408z M306,153H51V51h255V153
			z"/>
    </svg>
  );
}

export default AddIcon;
