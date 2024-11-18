import Typography from '@/_components/ui/Typography';
import DottedMenuIcon from '@/_lib/svg/DottedMenuIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function BlogCardMenu() {
  const itemClasses = 'cursor-pointer py-1 px-4 data-[highlighted]:bg-gray-100';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DottedMenuIcon className="w-6 h-6 cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="shadow-lg py-2 bg-white">
          <DropdownMenu.Item className={itemClasses}>
            <Typography variant="body2">Save</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClasses}>
            <Typography variant="body2">Share</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClasses}>
            <Typography variant="body2">Report</Typography>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
