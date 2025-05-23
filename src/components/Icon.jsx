// src/components/Icon.jsx
import DraggableItem from './DraggableItem';
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import "../css/Icon.css";
import defaultIcon from '../assets/icons/Microsoft Windows 3 Window Blank.ico';

const Icon = (props) => (
  <DraggableItem
    {...props}
    defaultIcon={defaultIcon}
    className="retro-icon"
    isDraggable={true}
  />
);

export default Icon;