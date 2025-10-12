import { Box, Typography } from "@mui/material";
import type { LinkType } from "../../../types/auth-form.types";

type LinksAuthFormProps = { links: LinkType[] };

const LinksAuthForm = ({ links }: LinksAuthFormProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {links.map((link, idx) => (
        <Typography
          key={idx}
          variant="body2"
          component="span"
          sx={{
            cursor: "pointer",
            color: "primary.main",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={link.onClick}
        >
          {link.text}
        </Typography>
      ))}
    </Box>
  );
};

export default LinksAuthForm;
