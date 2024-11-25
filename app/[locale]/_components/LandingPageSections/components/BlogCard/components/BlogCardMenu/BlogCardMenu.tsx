import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Typography from '@/_components/ui/Typography';
import DottedMenuIcon from '@/_lib/svg/DottedMenuIcon';

export function BlogCardMenu() {
  const itemClasses = 'cursor-pointer py-1 px-4 data-[highlighted]:bg-gray-100';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DottedMenuIcon className="h-6 w-6 cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="bg-white py-2 shadow-lg">
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
