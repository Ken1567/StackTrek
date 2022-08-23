function GCF(a,b) {
	if (! b) {
		return a;
	 }
	 return GCF(b, a % b);   
  };

module.exports = GCF;