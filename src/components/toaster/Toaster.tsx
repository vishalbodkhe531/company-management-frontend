// import { ToastType } from "@/types/types";
// import { toast } from "sonner";

// function ToasterComponent({
//   message,
//   description,
//   firstLable,
//   secLable,
//   caseHandler,
// }: ToastType) {
//   const triggerToast = () => {
//     toast(message, {
//       description,
//       action: {
//         label: firstLable,
//         onClick: () => caseHandler && caseHandler(firstLable),
//       },
//     });
//     toast(message, {
//       description,
//       action: {
//         label: secLable,
//         onClick: () => caseHandler && caseHandler(secLable!),
//       },
//     });
//   };

//   return triggerToast;
// }

// export default ToasterComponent;

import { ToastType } from "@/types/types";
import { toast } from "sonner";

function ToasterComponent({
  message,
  description,
  firstLable,
  secLable,
  caseHandler,
}: ToastType) {
  if (message) {
    toast(message, {
      description,
      action: {
        label: firstLable,
        onClick: () => caseHandler && caseHandler(firstLable!),
      },
    });

    if (secLable) {
      toast(message, {
        description,
        action: {
          label: secLable,
          onClick: () => caseHandler && caseHandler(secLable),
        },
      });
    }
  }
}

export default ToasterComponent;
