import * as React from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import useFetch from "@/hooks/useFetch";
import { each_permission_menu_details } from "@/utils";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function RolePermissionTree({ treeData, searchApi }: any) {

  console.log(`treeData`, treeData);
  const { error, deleteMsg, common_data, fetchDataCommon, setcommon_Data } =
    useFetch(`${API_URL}/permission`);

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [selectedItems_, setSelectedItems_] = React.useState<any>({});
  const toggledItemRef = React.useRef<{ [itemId: string]: boolean }>({});
  const apiRef = useTreeViewApiRef();

  function getItemDescendantsIds(item: TreeViewBaseItem) {
    const ids: string[] = [];
    let obj = {};
    obj = { ...obj, [item.id]: item };
    item.children?.forEach((child) => {
      obj = { ...obj, [child.id]: child };
      ids.push(child.id);
      ids.push(...getItemDescendantsIds(child));
    });

    setSelectedItems_({ ...selectedItems_, ...obj });

    return ids;
  }

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean,
  ) => {
    toggledItemRef.current[itemId] = isSelected;
  };

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    newSelectedItems: string[],
  ) => {
    setSelectedItems(newSelectedItems);

    // Select / unselect the children of the toggled item
    const itemsToSelect: string[] = [];
    const itemsToUnSelect: { [itemId: string]: boolean } = {};
    Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
      const item = apiRef.current!.getItem(itemId);
      if (isSelected) {
        setSelectedItems_({ ...selectedItems_, [item.id]: item });
        itemsToSelect.push(...getItemDescendantsIds(item));
      } else {
        delete selectedItems_[item.id];
        getItemDescendantsIds(item).forEach((descendantId) => {
          itemsToUnSelect[descendantId] = true;
          delete selectedItems_[descendantId];
          setSelectedItems_(selectedItems_);
        });
      }
    });

    const newSelectedItemsWithChildren = Array.from(
      new Set(
        [...newSelectedItems, ...itemsToSelect].filter(
          (itemId) => !itemsToUnSelect[itemId],
        ),
      ),
    );

    setSelectedItems(newSelectedItemsWithChildren);

    toggledItemRef.current = {};
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setcommon_Data(null);
    const permission = selectedItems.filter(
      (item: any) => !Number.isInteger(item),
    );
    const menu = selectedItems.filter((item: any) => Number.isInteger(item));

    if (permission.length) {
      console.log(`permission`, permission);
      const payload = permission.map((m: any) => {
        const permit = each_permission_menu_details(m);
        const obj = {
          roleId: searchApi?.roleId,
          permissionId: m.split("-")[0],
          checked: true,
          menuId: permit?.menu_id,
          menuModuleId: searchApi?.menuModuleId
        };
        return obj;
      });

      const page_list = `${API_URL}/rolemenupermission/list?roleId=${searchApi?.roleId || ""}&menuIds=${searchApi?.menuIds || ""}&menuModuleId=${searchApi?.menuModuleId}`;
      const method = "POST";

      const options = {
        method,
        data: payload,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await fetchDataCommon(page_list, options);
    }
    if (menu.length) {
      const payload = menu.map((m: any) => {
        const obj = {
          roleId: searchApi?.roleId,
          menuId: m,
          menuModuleId: searchApi?.menuModuleId

        };
        return obj;
      });

      const page_list = `${API_URL}/rolemenu/list?roleId=${searchApi?.roleId || ""}&menuIds=${searchApi?.menuIds || ""}&menuModuleId=${searchApi?.menuModuleId}`;
      const method = "POST";

      const options = {
        method,
        data: payload,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await fetchDataCommon(page_list, options);
    }

    Swal.fire({
      icon: "success",
      text: "Success",
      confirmButtonText: "Close",
    });
  };

  React.useEffect(() => {
    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "Close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  React.useEffect(() => {
    if (deleteMsg) {
      //show success message
      setcommon_Data(null);
      // fetchData();
    }
  }, [deleteMsg]);

  React.useEffect(() => {
    setSelectedItems(treeData[0]?.IdChecked);
  }, [treeData.length]);

  return (
    <Box sx={{ minHeight: 352, minWidth: 290 }}>
      <RichTreeView
        multiSelect
        checkboxSelection
        apiRef={apiRef}
        items={treeData}
        selectedItems={selectedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
        onItemSelectionToggle={handleItemSelectionToggle}
      />
      {selectedItems?.length > 0 && (
        <form className="" onSubmit={handleSubmit}>
          <AddButton />
        </form>
      )}
    </Box>
  );
}
