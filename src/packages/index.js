import HwCalendar from "./HwDatePicker/HwCalendar";
import HwDropdown from "./HwDropdownSys/HwDropdown";
import HwDropdownItem from "./HwDropdownSys/DropdownItem";
import HwContextMenu from "./HwContextMenu/HwContextMenu";
import HwButton from "./HwButton/HwButton";
import HwInput from "./HwInput/HwInput";
import HwTags from "./HwTags/HwTags";
import HwTag from "./HwTags/HwTag";
import HwSwitch from "./HwSwitch/HwSwitch";
import HwTreeView from "./HwTreeView";
import HwSelect from "./HwSelect/HwSelect";
import HwTab from './HwTab/HwTab';
import HwDataTable from './HwDataTable/HwDataTable';
import HwDatePicker from './HwDatePicker/HwDatePicker';
import HwPagination from './HwPagination/HwPagination';
import HwAvatarEditor from './HwAvatarEditor/HwAvatarEditor';
import HwTextEditor from "./HwTextEditor/HwTextEditor";
import HwTextEditor2 from "./HwTextEditor2/HwTextEditor2";
import HwRangeInput from "./HwRangeInput/HwRangeInput";
import HwFileController from "./HwFileController/HwFileController";
import HwLoading from "./HwLoading/HwLoading";
import HwProgressBar from "./HwProgressBar/HwProgressBar"
import HwList from "./HwList/HwList";
import HwGaugeBar from "./HwGaugeBar/HwGaugeBar";
import HwBadge from "./HwBadge/HwBadge";
import HwCheckBox from "./HwCheckBox/HwCheckBox";
import HwBreadcrumb from "./HwBreadcromb/HwBreadcrumb";
import HwDraggable from "./HwDraggable/HwDraggable";
import HwTreeList from "./HwTreeList/HwTreeList";
import HwExpandList from "./HwExpandList/HwExpandList";
import HwChips from "./HwChips/HwChips";
import HwSlider from "./HwSlider/HwSlider";
import ScrollSpy from "./ScrollSpy/ScrollSpy"

const hw_ui = [
    HwCalendar,
    HwDropdown,
    HwDropdownItem,
    HwContextMenu,
    HwTreeView,
    HwButton,
    HwInput,
    HwTags,
    HwTag,
    HwSwitch,
    HwSelect,
    HwTab,
    HwDataTable,
    HwDatePicker,
    HwPagination,
    HwAvatarEditor,
    HwTextEditor,
    HwTextEditor2,
    HwRangeInput,
    HwFileController,
    HwLoading,
    HwProgressBar,
    HwExpandList,
    HwList,
    HwGaugeBar,
    HwBadge,
    HwCheckBox,
    HwBreadcrumb,
    HwDraggable,
    HwTreeList,
    HwExpandList,
    HwChips,
    HwSlider,
    ScrollSpy
];

const install = (Vue) => {
    hw_ui.forEach(component => {
        Vue.component(component.name, component);
    })
};

export default {
    install,
    HwCalendar,
    HwDropdown,
    HwDropdownItem,
    HwContextMenu,
    HwTreeView,
    HwButton,
    HwInput,
    HwTags,
    HwTag,
    HwSwitch,
    HwSelect,
    HwTab,
    HwDataTable,
    HwDatePicker,
    HwPagination,
    HwAvatarEditor,
    HwTextEditor,
    HwTextEditor2,
    HwRangeInput,
    HwFileController,
    HwLoading,
    HwProgressBar,
    HwList,
    HwGaugeBar,
    HwBadge,
    HwCheckBox,
    HwBreadcrumb,
    HwDraggable,
    HwTreeList,
    HwExpandList,
    HwChips,
    HwSlider,
    ScrollSpy
}
