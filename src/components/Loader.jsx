import { motion } from "framer-motion";
import { images } from "../data/assets";

export default function Loader({ copy }) {
  return (
    <motion.div
      className="loader ganesha-loader"
      role="status"
      aria-label={copy.open}
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.65 }}
    >
      <div className="loader-deity">
        <motion.div
          className="loader-wheel"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <i />
          <i />
          <i />
          <span>✦</span>
        </motion.div>
        <motion.img
          src={images.ganesha}
          alt={copy.ganesha}
          width="1254"
          height="1254"
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        {copy.loader}
      </motion.p>
    </motion.div>
  );
}
