// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { PropsWithChildren, useState } from "react";

// type Props = PropsWithChildren & {
//   href: string;
//   currentIndex: number;
// };

// export default function HoverEffect({ children, currentIndex, href }: Props) {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <Link
//       href={href}
//       className="relative block h-full w-full p-2"
//       onMouseEnter={() => setHoveredIndex(currentIndex)}
//       onMouseLeave={() => setHoveredIndex(null)}
//     >
//       <AnimatePresence>
//         {hoveredIndex === currentIndex && (
//           <motion.span
//             className="absolute inset-0 block h-full w-full bg-red-500"
//             initial={{ opacity: 0 }}
//             animate={{
//               opacity: 1,
//               transition: { duration: 0.15 },
//             }}
//             exit={{
//               opacity: 0,
//               transition: { duration: 0.15, delay: 0.2 },
//             }}
//           />
//         )}
//       </AnimatePresence>
//       {children}
//     </Link>
//   );
// }
