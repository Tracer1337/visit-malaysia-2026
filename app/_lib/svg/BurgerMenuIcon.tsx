import { ComponentProps } from 'react';

export default function BurgerMenuIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="#fff"
      {...props}
    >
      <path d="M23.352 16.895H9.644c-.457 0-.761-.297-.761-.742s.304-.741.761-.741h13.708c.457 0 .762.296.762.741s-.305.742-.762.742Zm0-4.45H9.644c-.457 0-.761-.297-.761-.742s.304-.742.761-.742h13.708c.457 0 .762.297.762.742s-.305.742-.762.742Zm0 8.9H9.644c-.457 0-.761-.296-.761-.741s.304-.742.761-.742h13.708c.457 0 .762.297.762.742s-.305.742-.762.742Z" />
    </svg>
  );
}
