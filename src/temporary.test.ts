import Bucket from "./index";

hex = Bucket.create("hex");
hex.add("test1", 1);
hex.add("test2", 1);
hex.create("subtable");
subtable = Bucket.get("subtable");
subtable.add("test3", 1);
subtable.roll();
