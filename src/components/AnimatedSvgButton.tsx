import React, { useState } from 'react'
import { Spring, animated, easings, config } from 'react-spring'
import { Tooltip } from 'antd';

interface AnimatedSvgButtonProps {
   Icon: any,
   styles: object,
   onClick?: () => void,
   tooltipTitle?: string
}

const AnimatedSvgButton: React.FC<AnimatedSvgButtonProps> = ({ Icon, styles, onClick, tooltipTitle }) => {

   const [pressed, setPressed] = useState(false);
   const AnimatedIcon = animated(Icon)

   return (
      <Spring from={{ scale: 1 }} to={{ scale: pressed ? 0.8 : 1 }} config={config.wobbly}>
         {({ scale }) => (
            <Tooltip title={tooltipTitle}>
               <AnimatedIcon
                  key="alert"
                  style={{ ...styles, transform: scale.to(scale => `scale(${scale})`) }}
                  onMouseDown={() => setPressed(true)}
                  onMouseUp={() => setPressed(false)}
                  onClick={onClick}
               />
            </Tooltip>
         )}
      </Spring>
   )
}

export default AnimatedSvgButton