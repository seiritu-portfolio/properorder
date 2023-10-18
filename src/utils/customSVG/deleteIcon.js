import React from "react";

export default function deleteIcon(color = "#FB1818", sizeScale = 1) {
  return (
    <svg
      width={15 * sizeScale}
      height={16 * sizeScale}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9567 6.32633C11.9567 6.37167 11.6323 10.865 11.447 12.7563C11.331 13.9169 10.6479 14.6216 9.62313 14.6409C8.83519 14.6603 8.06501 14.6669 7.30668 14.6669C6.50157 14.6669 5.71423 14.6603 4.94997 14.6409C3.95957 14.6149 3.27583 13.8976 3.16572 12.7563C2.9751 10.8583 2.65661 6.37167 2.65069 6.32633C2.64477 6.189 2.68502 6.059 2.76672 5.95434C2.84723 5.85634 2.96326 5.79834 3.08521 5.79834H11.5281C11.6495 5.79834 11.7596 5.85634 11.8466 5.95434C11.9277 6.059 11.9686 6.189 11.9567 6.32633Z"
        fill={color}
      />
      <path
        d="M12.7826 3.9848C12.7826 3.71081 12.5855 3.49548 12.3487 3.49548H10.5739C10.2128 3.49548 9.89903 3.21481 9.81852 2.81815L9.71906 2.33149C9.57994 1.74483 9.09925 1.3335 8.56113 1.3335H6.04755C5.50351 1.3335 5.02815 1.74483 4.8837 2.36415L4.79076 2.81881C4.70966 3.21481 4.3959 3.49548 4.03538 3.49548H2.2606C2.02321 3.49548 1.82608 3.71081 1.82608 3.9848V4.23813C1.82608 4.50547 2.02321 4.72746 2.2606 4.72746H12.3487C12.5855 4.72746 12.7826 4.50547 12.7826 4.23813V3.9848Z"
        fill={color}
      />
    </svg>
  );
}
